CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    author text,
    url text NOT NULL,
    likes integer DEFAULT 0
);
INSERT INTO blogs (title,author,url,likes) VALUES ('React patterns','Michael Chan','https://reactpatterns.com/',7);
insert into blogs (title,author,url,likes) values ('Go To Statement Considered Harmful','Edsger W. Dijkstra','http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',5);
