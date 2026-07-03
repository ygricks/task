-- --------------
-- tables
-- --------------

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    created_by BIGINT NOT NULL,
    name VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_task_user FOREIGN KEY(created_by) REFERENCES users(id)
);

-- --------------
-- importing data
-- --------------

INSERT INTO users(name, email, password) VALUES
('admin','admin@example.com', '$2b$10$022aWTKzOxxC82E22qWRLOslzm5/E.KAMZhBGybxk4uY5AYhk/fsK');
-- 123

INSERT INTO tasks(created_by, name, description, status) VALUES
(1,'buy','to buy a house',0),
(1,'listen','to listen good music',0),
(1,'sell','to sell a car',0),
(1,'rent','to rent an apartment',0),
(1,'Lorem, ipsum.','Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, cum.',random(0,2)),
(1,'Porro, magnam.','Reprehenderit vero ut error iure perferendis possimus quos voluptatibus, sunt.',random(0,2)),
(1,'Non, qui.','Mollitia hic, vel laudantium reprehenderit magni molestiae autem, assumenda ipsam.',random(0,2)),
(1,'Assumenda, officia.','Asperiores maiores sapiente optio saepe numquam repudiandae eos voluptatibus dolore?',random(0,2)),
(1,'Officiis, debitis.','Sint magni mollitia impedit praesentium vel totam animi omnis voluptatem.',random(0,2)),
(1,'Magnam, sapiente!','Nam sed, harum eligendi perspiciatis, placeat tempore. Autem aliquid, earum.',random(0,2)),
(1,'Sequi, nesciunt.','Necessitatibus ex odit atque quod natus possimus consequatur, nostrum, optio.',random(0,2)),
(1,'Id, repellat!','Cum, quia aliquam itaque repellendus laudantium commodi officia laboriosam, nihil.',random(0,2)),
(1,'Impedit, saepe.','Maiores alias ipsam, ratione, quia in accusantium sunt nobis earum?',random(0,2)),
(1,'Autem, sunt.','Aspernatur nisi voluptates quod necessitatibus sequi culpa animi. Magni, provident?',random(0,2)),
(1,'Minus, autem!','Inventore, in quaerat tenetur, voluptates tempore vero nobis officia vitae.',random(0,2)),
(1,'Voluptatem, vero?','Accusantium blanditiis, laboriosam beatae perspiciatis perferendis assumenda, delectus numquam ipsum.',random(0,2)),
(1,'Excepturi, commodi.','Commodi obcaecati, error enim delectus. Neque, sint rem vitae tempore.',random(0,2)),
(1,'Quisquam, pariatur.','In est quos adipisci assumenda ut neque ea, corrupti odit.',random(0,2)),
(1,'Error, perspiciatis?','Tempore nulla laborum ex rem aut iure voluptate asperiores itaque!',random(0,2)),
(1,'Hic, assumenda.','Nihil aspernatur, molestiae, earum quo vel harum totam sunt eum.',random(0,2)),
(1,'Sint, voluptatibus?','Natus asperiores exercitationem qui voluptatem impedit minus eaque ratione sunt.',random(0,2)),
(1,'Illum, quisquam!','Aperiam ut rerum est numquam nostrum placeat repudiandae cum at.',random(0,2)),
(1,'Accusantium, reprehenderit?','Porro sequi aliquam natus dolores veritatis vitae cumque temporibus! Culpa.',random(0,2)),
(1,'Quibusdam, porro!','Nihil assumenda nesciunt pariatur itaque magni cupiditate magnam. Itaque, incidunt.',random(0,2)),
(1,'Recusandae, amet!','Nisi quo illo porro explicabo inventore aut exercitationem, quisquam veniam.',random(0,2)),
(1,'Voluptas, aperiam?','Cum, eveniet sed iusto dolorem fugit, quos error voluptatem beatae?',random(0,2)),
(1,'Quia, nemo.','Illum ipsum voluptatum esse pariatur culpa temporibus! Ut, amet adipisci!',random(0,2)),
(1,'A, earum.','Accusantium laboriosam cupiditate iste iusto possimus voluptate quaerat molestiae minus.',random(0,2)),
(1,'Officiis, fugiat.','Fugit, hic? Architecto sed nemo reprehenderit ea expedita, est harum!',random(0,2)),
(1,'Repellendus, optio.','Voluptatibus facilis illum magni quo minima impedit, molestias nobis explicabo?',random(0,2)),
(1,'Sequi, vitae.','Recusandae assumenda earum laboriosam excepturi molestiae. Tempora pariatur a fugiat?',random(0,2)),
(1,'Eos, atque.','Fugit facere voluptate sed tempora voluptates eum reprehenderit inventore dolore!',random(0,2)),
(1,'Qui, pariatur.','Dolorem assumenda quia autem vel aliquam laborum molestias. Officia, ducimus.',random(0,2)),
(1,'Deleniti, libero?','Aliquam similique perferendis ratione, necessitatibus provident tenetur placeat quam nesciunt!',random(0,2));
