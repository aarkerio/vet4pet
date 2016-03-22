-- vets4pets Tables
-- Chipotle Software (c) 2015-2016   MIT License

-- rails g scaffold Group name:string description:string
CREATE TABLE groups (
  "id" serial PRIMARY KEY,
  "name" varchar(50) NOT NULL UNIQUE,
  "description" varchar(150) NOT NULL
);

-- Users
-- rails g scaffold User fname:string lname:string uname:string email:string  passwd:string active:boolean group:references
CREATE TABLE users (
    "id" serial PRIMARY KEY,
    "uname" varchar(50) NOT NULL UNIQUE, --login
    "passwd"  varchar(36)  NOT NULL,
    "fname"  varchar(70)  NOT NULL,           --real name
    "lname"  varchar(70)  NOT NULL,           --real name
    -- "email"  varchar(45)  NOT NULL UNIQUE,    -- this column is currently dropped in order to use devise
    "group_id" integer NOT NULL,                                                     -- Admin, normal user
    "created" timestamp(0) with time zone DEFAULT now() NOT NULL
);


-- rails g scaffold Appointment scheduled_time:datetime pet:references reminder:boolean reason_for_visit: string doctor_id:integer

CREATE TABLE comments (  --discutions on news
 	"id" serial PRIMARY KEY,
 	"notice_id" int NOT NULL REFERENCES notices(id) ON DELETE CASCADE,
 	"name" varchar(100),
 	"comment" text NOT NULL,
 	"created" timestamp(0) with time zone DEFAULT now() NOT NULL,
 	"level" int NOT NULL,
 	"comentnew_id" int NOT NULL,
 	"user_id" int NOT NULL,
 	"status" int NOT NULL DEFAULT 1,
 	"spam" int NOT NULL DEFAULT 0
);

-- Images if portal users
-- rails g scaffold Image file:string user:references
CREATE TABLE images (
   id serial PRIMARY KEY,
   file varchar(40) NOT NULL UNIQUE,
   user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- rails g scaffold Kind name:string image:references

-- Pets
-- rails g scaffold Pet name:string age:int image:references kind:references interned:boolean created:timestamp tags:string user:references


-- User profiles
-- rails g scaffold Profile cv:text avatar:string quote:string name_blog:string livechat:boolean wiwd:boolean tags:string fck:boolean  user:references
CREATE TABLE profiles (
    id serial PRIMARY KEY,
    website  varchar(500),
    cv text,
    lang varchar(3) DEFAULT 'es',   -- english by default
    avatar  varchar(100) DEFAULT 'default-avatar.jpg' NOT NULL,
    "quote"  varchar(150),
    name_blog  varchar(150),
    license_id smallint REFERENCES licenses(id) ON DELETE CASCADE NOT NULL DEFAULT 6,  -- kind of license selecte dby the user
    livechat smallint NOT NULL DEFAULT 1,  -- active ajax chat on blog
    wiwd smallint NOT NULL DEFAULT 1,   -- what I was doing
    active smallint NOT NULL DEFAULT 0,  -- active =1, desactived = 0
    tags text NOT NULL DEFAULT 'arts, music, hacking, environment, education, pets',
    fck boolean NOT NULL DEFAULT True
);

-- bloggers Bookmarks links
-- rails g scaffold Bookmark name:string url:string tags:string created:timestamp user:references
CREATE TABLE bookmarks (
   id serial PRIMARY KEY,
   name varchar(50) NOT NULL,
   url varchar(300) NOT NULL,
   tags varchar(300) NOT NULL,
   user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   created timestamp(0) with time zone DEFAULT now() NOT NULL
);

-- Page s sections
-- rails g scaffold Section description:string  order:integer img:string
CREATE TABLE sections (
"id" serial PRIMARY KEY,
"description" varchar(50) NOT NULL,
"order" numeric NOT NULL,
"img" varchar(60) NOT NULL
);

-- rails g scaffold Page title:string body:text discution:boolean published:boolean visits:integer tags:string rank:integer cv:boolean editor:boolean user:references created:timestamp section:references
CREATE TABLE pages (   -- estatic pages
   id serial PRIMARY KEY,
   section_id int REFERENCES sections(id),
   title varchar(180) NOT NULL,
    body text NOT NULL,
    created timestamp(0) with time zone DEFAULT now() NOT NULL,
    updated timestamp(0) with time zone DEFAULT now() NOT NULL,
    discution int NOT NULL DEFAULT 1,  -- 1= comentarios activados   0 = no activados
    display int NOT NULL DEFAULT 1,    -- EL cintillo
    status int NOT NULL DEFAULT 0,     -- 0 = draft, 1 = publicado
    visits int NOT NULL DEFAULT 0,
   rank int NOT NULL DEFAULT 0,
   user_id int NOT NULL REFERENCES users (id),
   cv int NOT NULL DEFAULT 0,  -- mostrar cv del usuario en la pagina = 1
   editor int NOT NULL DEFAULT 1
);

-- Discutions on static pages
-- rails g scaffold Discution title:string comment:text page:references  section:references
CREATE TABLE discutions (    --discutions on
     id serial PRIMARY KEY,
     comment text,
     level int NOT NULL,
     discution_id int NOT NULL,
     username varchar(20) NOT NULL DEFAULT '',
     user_id int NOT NULL,
     page_id int NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
     "created" timestamp(0) with time zone DEFAULT now() NOT NULL
);

-- Sections on personal blogs
-- rails g scaffold Subject subject:string user:references
CREATE TABLE subjects (
   id serial PRIMARY KEY,
   subject varchar(110) NOT NULL,
   user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

--Entries users weblogs
-- rails g scaffold Entry title:string body:text subject:references status:boolean user:references discution:boolean tags:string visits:integer
CREATE TABLE entries (
   id serial PRIMARY KEY,
   title varchar(250) NOT NULL,
   body text NOT NULL,
   subject_id int NOT NULL REFERENCES themeblogs(id),
   status int NOT NULL DEFAULT 0,
   user_id int NOT NULL REFERENCES users(id),
   discution int NOT NULL DEFAULT 1,   -- Discution on entry, Actived/Desactived   1/0
   tags varchar(100),  -- in Profile model
   visits int NOT NULL DEFAULT 0
);

-- Discutions on blogs entries
-- rails g scaffold CommentBlog comment:text username:string website:string email:string user:references entry:references
CREATE TABLE comment_blogs (    
 "id" serial PRIMARY KEY,
 "comment" text,
 "entry_id" int NOT NULL REFERENCES entries(id) ON DELETE CASCADE,
 "username" varchar(25) NOT NULL,
 "email" varchar(50),
 "website" varchar(250),
 -- "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
 "user_id" int NOT NULL DEFAULT 0
);

-- rails g scaffold Livechat message:string created:timestamps sender:string user:references
CREATE TABLE livechats (     -- Live Chat
   "id" serial PRIMARY KEY,
   "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE NOT NULL,
   "message" varchar(130) NOT NULL,
   "sender_name" varchar(13) NOT NULL, --sender_id int NOT NULL DEFAULT 0, maybe later
   "created" timestamp(0) with time zone DEFAULT now() NOT NULL
);

-- CSS Styles to each blogger
--rails g scaffold Style style:text user:references
CREATE TABLE styles (
    "id" serial PRIMARY KEY,
    "user_id" int NOT NULL UNIQUE,
    "style" text NOT NULL
);

--rails g scaffold Quote quote:string author:string user:references

CREATE TABLE quotes (
    "id" serial PRIMARY KEY,
    "quote" varchar(150) NOT NULL,
    "author" varchar(70) NOT NULL,
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- what are you doing?
-- rails g scaffold Wayding task:string created:timestamps user:references
CREATE TABLE waydings (
    "id" serial PRIMARY KEY,
    "task" varchar(80) NOT NULL,
    "created" timestamp(0) NOT NULL DEFAULT now(),
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Share it!
--rails g scaffold Share file:string description:string created:timestamps public:boolean user:references
CREATE TABLE shares (
    "id" serial PRIMARY KEY,
    "file" varchar(50) UNIQUE NOT NULL,
    "description" varchar(150) NOT NULL,
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
    "secret"  varchar(16) NOT NULL UNIQUE, -- the secret reference
    "public" int NOT NULL DEFAULT 0  --shareable?
);


-- rails g scaffold Lang title:string code:string

-- Discutions on news
-- rails g scaffold Course title:string description:text objectives:text audience:text syllabus:text format:text status:boolean public:boolean knet:boolean code:string user:references subject:references lang:references

CREATE TABLE "courses" (
  "id" serial PRIMARY KEY,
  "title" varchar(110) NOT NULL,
  "description" text,
  "objectives" text,
  "audience" text,
  "syllabus" text,
  "format" text,
  "status" smallint DEFAULT 0 NOT NULL,
  "public" boolean DEFAULT False,
  "lang_id" int NOT NULL REFERENCES langs(id),
  "subject_id" int NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "code" varchar(13),
  "knet" smallint NOT NULL DEFAULT 0
);

-- Discutions on news
-- rails g scaffold Activity title:string activity:text notes:text points:integer minutes:integer order:integer status:boolean user:references course:references 
CREATE TABLE activities (
    "id" serial PRIMARY KEY,
    "title" varchar(40) NOT NULL,
    "activity" text NOT NULL,
    "order" smallint DEFAULT 1 NOT NULL,
    "status" smallint DEFAULT 0 NOT NULL,
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "ecourse_id" int NOT NULL REFERENCES ecourses(id) ON DELETE CASCADE,
    "notes" text,
    "points" smallint DEFAULT 0 NOT NULL,
    "minutes" smallint DEFAULT 0 NOT NULL
);

