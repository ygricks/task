-- --------------
-- tables
-- --------------

CREATE TABLE tasks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    status INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- --------------
-- importing data
-- --------------

INSERT INTO tasks(name, description) VALUES
('buy', 'to buy a house'),
('listen', 'to listen good music'),
('sell', 'to sell a car'),
('rent', 'to rent an apartment');