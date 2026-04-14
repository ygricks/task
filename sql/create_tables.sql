-- --------------
-- tables
-- --------------

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
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
('admin','admin@example.com', '123');

INSERT INTO tasks(created_by, name, description) VALUES
(1, 'buy', 'to buy a house'),
(1, 'listen', 'to listen good music'),
(1, 'sell', 'to sell a car'),
(1, 'rent', 'to rent an apartment');