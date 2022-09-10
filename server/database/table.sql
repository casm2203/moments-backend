CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name  VARCHAR(200) NOT NULL,
        email  VARCHAR(300) NOT NULL,
        password VARCHAR(300) NOT NULL,
        url_img  VARCHAR(300) NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE moment (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(200) NOT NULL,
        body  VARCHAR(300) NOT NULL,
        url_img  VARCHAR(300) NOT NULL,
        likes INTEGER NOT NULL DEFAULT 0,
		  user_id INTEGER not null,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        foreign key (user_id) references user (id) on delete cascade on update CASCADE
);