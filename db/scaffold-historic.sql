-- vet4pet Tables
-- Chipotle Software (c) 2015

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

-- Discutions on news
-- rails g scaffold Vclassroom name:string sdate:date fdate:date secret:string status:boolean access:boolean diploma:boolean chat:boolean message:boolean percentage:integer user:references ecourse:references

CREATE TABLE vclassrooms (
    "id" serial PRIMARY KEY,
    "name" varchar(150) NOT NULL,
    "status" smallint DEFAULT 0 NOT NULL,
    "ecourse_id" int NOT NULL REFERENCES ecourses(id) ON DELETE CASCADE,
    "secret" varchar(10),
    "sdate" date NOT NULL DEFAULT now(), --starting date
    "fdate" date NOT NULL DEFAULT now(), -- finish date
    "access" smallint NOT NULL DEFAULT 0,
    "percentage" smallint NOT NULL DEFAULT 60, 
    "message" boolean NOT NULL DEFAULT True,
    "chat" smallint NOT NULL DEFAULT 0, -- active / desactive chat
    "videoconference" smallint NOT NULL DEFAULT 0, -- active / desactive FLV stream
    "streaming" text,
    "evaluation" smallint NOT NULL DEFAULT 0, -- active / desactive student evaluation when course finish
    "diploma" smallint NOT NULL DEFAULT 0, -- active / desactive diploma when student get enough points
    "gcalendar_id" varchar(70) 
);

COMMENT ON TABLE vclassrooms IS 'Virtual classrooms';
COMMENT ON COLUMN vclassrooms.status IS 'Define published or draft';
COMMENT ON COLUMN vclassrooms.historical IS 'Vclassroom is now historical record';
COMMENT ON COLUMN vclassrooms.secret IS 'Secret code to allow students register by themselves';
COMMENT ON COLUMN vclassrooms.access IS 'Public VC in other words without secret code';
COMMENT ON COLUMN vclassrooms.message IS 'Just enabled disabled little message in vclassroom if teacher is logged, See show method';

-- Students comments about course when vclassroom finish
-- rails g scaffold Evaluation evaluation:text instructor:integer materials:integer  take_another:boolean vclassroom:references
CREATE TABLE evaluations (
 "id" serial PRIMARY KEY,
 "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
 "evaluation" smallint,
 "intructors" smallint,
 "materiales" smallint
);

-- @Package: quizz
-- quizz model tables beggins
-- rails g scaffold Quizz title:string description:text status:boolean archived:boolean knet:boolean type:boolean user:references

CREATE TABLE "quizzs" (
  "id" serial PRIMARY KEY,
  "title" varchar(50), 
  "description" text NOT NULL,
  "status" smallint NOT NULL DEFAULT 0 CHECK (status IN (1, 0)),
  "archived" boolean NOT NULL DEFAULT False,
  "knet" smallint NOT NULL DEFAULT 0,
  "type" smallint NOT NULL DEFAULT 0,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE quizzs IS 'Quizz quizzs';
COMMENT ON COLUMN quizzs.type IS 'One view or wizard';

-- rails g scaffold Question question:string hint:string explanation:text status:boolean worth:integer type:boolean order:integer user:references quizz:references
CREATE TABLE "questions" (
  "id" serial PRIMARY KEY,
  "question" text NOT NULL,
  "hint" varchar(150) NOT NULL,
  "explanation" text NOT NULL,
  "status" smallint NOT NULL DEFAULT 0,
  "worth" smallint NOT NULL DEFAULT 1,
  "type" smallint NOT NULL DEFAULT 1,
  "order" smallint NOT NULL DEFAULT 1,
  "quizz_id" int NOT NULL REFERENCES quizzs(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE questions IS 'Questions in quizzs, hasMany Answer';
COMMENT ON COLUMN questions.hint IS 'Optional hint to student';
COMMENT ON COLUMN questions.type IS '1=multiple options, 2=open answer';
COMMENT ON COLUMN questions.order IS 'Order in quizz';

-- rails g scaffold Answer answer:string correct:boolean user:references question:references
CREATE TABLE "answers" (
  "id" serial PRIMARY KEY,
  "answer" varchar(150) NOT NULL,
  "correct" smallint NOT NULL,
  "question_id" int NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

COMMENT ON TABLE answers IS 'Answers to Question Model, quizz module';
COMMENT ON COLUMN answers.correct IS 'wrong = 0, correct = 1';


--  quizzs student results
-- rails g scaffold Result answer_id:integer answer:text correct:boolean checked:boolean user:references vclassroom:references quizz:references question:references
CREATE TABLE results ( 
  "id" serial NOT NULL UNIQUE,
  "answer_id" int,
  "answer" text,
  "correct" smallint NOT NULL DEFAULT 0,
  "checked" smallint NOT NULL DEFAULT 0,
  "quizz_id" int NOT NULL REFERENCES quizzs(id) ON DELETE CASCADE,
  "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,    -- student id
  "question_id" int NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
   PRIMARY KEY (user_id, quizz_id, vclassroom_id, question_id));

COMMENT ON TABLE results IS 'Student answers to quizz quizzs HABTM relationship';
COMMENT ON COLUMN results.answer_id IS 'Answer to multiple option, is not used in open questions';
COMMENT ON COLUMN results.answer IS 'Answer to open questions';
COMMENT ON COLUMN results.correct IS 'Answer to open questions: correct or wrong';

--  quizzs student results
CREATE TABLE "quizzs_students" ( 
  "id" serial NOT NULL UNIQUE,
  "user_id" int NOT NULL,   
  "quizz_id" int NOT NULL,
  "vclassroom_id" int NOT NULL,
  "checked" smallint NOT NULL DEFAULT 0,
  "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
   PRIMARY KEY (user_id, quizz_id, vclassroom_id)
);

COMMENT ON TABLE quizzs_students IS 'quizz answered by student,graded and sent by teacher';
COMMENT ON COLUMN quizzs_students.checked IS 'If 1 teacher has sent quizzs result to students email manually';

-- Linking Kandie
CREATE TABLE "quizzs_vclassrooms" (
 "id" serial PRIMARY KEY,
 "quizz_id" int NOT NULL REFERENCES quizzs(id) ON DELETE CASCADE,
 "vclassroom_id" int NOT NULL REFERENCES vclassrooms(id) ON DELETE CASCADE,
 "sdate"  timestamp(0) with time zone DEFAULT now() NOT NULL,
 "fdate"  timestamp(0) with time zone DEFAULT now() NOT NULL,
 "hidden" boolean NOT NULL DEFAULT True,
  UNIQUE  ("quizz_id", "vclassroom_id")
);



-- Name: polls; Type: TABLE; Schema: public; Owner: www-data; Tablespace: 
--rails g scaffold Share file:string description:string created:timestamps public:boolean user:references
CREATE TABLE polls (
    id serial PRIMARY KEY,
    question varchar(130) NOT NULL,
    created timestamp(0) with time zone DEFAULT now() NOT NULL,
    user_id integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    status integer DEFAULT 0 NOT NULL,
    comments boolean NOT NULL DEFAULT True 
);

-- Name: pollrows; Type: TABLE; Schema: public; Owner: www-data; Tablespace: 
CREATE TABLE pollrows (
    id serial PRIMARY KEY,
    poll_id integer NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
    answer varchar(130) NOT NULL,
    color varchar(15) DEFAULT 'green' NOT NULL,
    vote integer DEFAULT 0 NOT NULL
);

--Gallerys
--rails g scaffold Share file:string description:string created:timestamps public:boolean user:references
CREATE TABLE galleries (
 id serial PRIMARY KEY,
 title varchar(90),
 description varchar(150),
 status int NOT NULL DEFAULT 1,
 user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- photos inside gallery
--rails g scaffold Share file:string description:string created:timestamps public:boolean user:references
CREATE TABLE photos (
   id serial PRIMARY KEY,
   gallery_id int REFERENCES galleries(id) ON DELETE CASCADE,  -- Gallery
   file varchar(30) NOT NULL UNIQUE,
   title varchar(30),
   text varchar(100),
   "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
   user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Comment in photograph
--rails g scaffold Share file:string description:string created:timestamps public:boolean user:references
CREATE TABLE comments_photos (    --las discusiones en los blogs
 "id" serial PRIMARY KEY,
 "coment" text,
 "photo_id" int NOT NULL REFERENCES photos(id) ON DELETE CASCADE,
 "username" varchar(25) NOT NULL,
 "email" varchar(50),
 "website" varchar(250),
 "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
 "user_id" int NOT NULL DEFAULT 0
);

###
###   MAYBE LATER MODELS
###

CREATE TABLE polls_comments ( -- comments on poll
id serial PRIMARY KEY,
poll_id int NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
comment text NOT NULL,
user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
created timestamp(0) with time zone DEFAULT now() NOT NULL
);

--TODOs from crazylegs 
CREATE TABLE todos (
  "id" serial PRIMARY KEY,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "name" varchar(80) NOT NULL,
  "task" varchar(255) NOT NULL DEFAULT '',
  "type" varchar(2)  NOT NULL DEFAULT 'L',
  "completed" smallint NOT NULL DEFAULT 0,
  "priority" int NOT NULL DEFAULT 2,
  "created" timestamp(0) with time zone NOT NULL DEFAULT now(),
  "modified" timestamp(0) with time zone NOT NULL DEFAULT now(),
  "deadline" date NOT NULL DEFAULT now() + '1 week'
);

-- Podcasts
--rails g scaffold Podcast title:string file:string description:string created:timestamps public:boolean user:references
CREATE TABLE "podcasts" (
   	"id" serial PRIMARY KEY, 
	"title" varchar(50) NOT NULL DEFAULT '', 
	"description" varchar(255) NOT NULL DEFAULT '', 
	"created" timestamp(0) with time zone NOT NULL DEFAULT now(),
	"length" varchar(10) NOT NULL DEFAULT 0,
	"duration" varchar(8) NOT NULL DEFAULT '',
	"file" varchar(100) NOT NULL,
	"keywords" varchar(255) NOT NULL DEFAULT '',
    "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    "status" int NOT NULL DEFAULT 0
);


-- Messages between users

--rails g scaffold Message file:string description:string created:timestamps public:boolean user:references
CREATE TABLE messages (
    "id" serial PRIMARY KEY,
    "title" varchar(90) NOT NULL,
    "body" text NOT NULL,
    "created" timestamp(0) with time zone DEFAULT now() NOT NULL,
    "level" integer NOT NULL DEFAULT 0,  -- build the message thread if reply exist
    "sender_id" integer NOT NULL DEFAULT 0, -- Who send the message
    "user_id" integer NOT NULL REFERENCES users(id) ON DELETE CASCADE,  -- Who receive the message
    "readed" smallint NOT NULL DEFAULT 0, -- recipient has readed the message?
    "status" smallint NOT NULL DEFAULT 0
);

-- rails g scaffold Catdownload title:string
CREATE TABLE catdownloads (
   id serial PRIMARY KEY,
   title varchar(100) NOT NULL
);

-- rails g scaffold Download title:string description:text catdownload:references user:references url:string
CREATE TABLE downloads (
   "id" serial PRIMARY KEY,
   "title" varchar(100) NOT NULL,
   "description" text NOT NULL,
   "catdownload_id" int NOT NULL REFERENCES catdownloads(id) ON DELETE CASCADE,
   "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
   "url" varchar(200) NOT NULL
 );

--  Banners 
CREATE TABLE banners (
 "id" serial PRIMARY KEY,
 "img" varchar(30) NOT NULL,
 "link" varchar(300) NOT NULL,
 "tooltip" varchar(90)
);

#
# Table structure for table newsletters
#
-- rails g scaffold admin/Newsletter title:string plainemail:text htmlemail:text status:boolean
CREATE TABLE newsletters (
  "id" serial PRIMARY KEY,
  "title" varchar(100) NOT NULL,
  "description" varchar(200) NOT NULL,
  "htmlemail" text NOT NULL,
  "plainemail" text NOT NULL,
  "status" boolean NOT NULL default true
);

-- rails g scaffold admin/Campaigns group:string, value:string, historic:boolean, newsletter:references 

#
# Table structure for table newsletterarchive
#
-- rails g scaffold admin/Nlarchive sent:timestamps status:boolean numsent:integer newsletter:references 
CREATE TABLE nlarchives (
  "id" serial PRIMARY KEY,
  "newsletter_id" int NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  "sent" timestamp NOT NULL default CURRENT_TIMESTAMP,
  "status" boolean NOT NULL default true,
  "numsent" integer NOT NULL default 0
);

# --------------------------------------------------------
# MAYBE
# Table structure for table newslettermembers
#
-- rails g scaffold admin/Nlclicked clicked:timestamps user:references newsletter:references
CREATE TABLE nlclicks (
  "id" serial PRIMARY KEY,
  "newsletter_id" int NOT NULL REFERENCES newsletters(id) ON DELETE CASCADE,
  "user_id" int NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  "clicked" timestamp int(10) unsigned NOT NULL default '0'
);

