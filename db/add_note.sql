CREATE or replace FUNCTION add_note (user_id integer, title varchar, body varchar, tags varchar)
RETURNS integer AS $$
DECLARE
  nid integer;
  tid integer;
  tagname varchar;
  names varchar[];
  /* that means an array of strings */
BEGIN
  insert into notes (title, body, user_id) values (title, body, user_id) returning id into nid;
  select string_to_array(tags, ',') into names;
  raise notice 'nid: %', nid;
  raise notice 'names: %', names;

  /* create a temporary table called tagger that will have the submitted tags that already
  exist in the db
  */
  CREATE TEMP TABLE tagger ON COMMIT DROP AS SELECT nid, t.id as tid, t.name as tname FROM tags t where t.name = any(names);

/* now loop over the tags that dont exist yet*/
  foreach tagname in array names
  loop
    tid := (select t.tid from tagger t where t.tname = tagname);
    raise notice 'tid: %', tid;
    IF tid is null THEN
      insert into tags (name) values (tagname) returning id into tid;
      insert into tagger values (nid, tid, tagname);
    END IF;
  end loop;

  insert into notes_tags select t.nid, t.tid from tagger t;


  return nid;
END;
$$ LANGUAGE plpgsql;
