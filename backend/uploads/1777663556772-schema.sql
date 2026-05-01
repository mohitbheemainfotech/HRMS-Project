-- ============================================================
--  DTC Automated Bus Scheduling & Route Management System
--  Database Schema  |  MySQL 8.x
-- ============================================================

CREATE DATABASE IF NOT EXISTS dtc_bus_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dtc_bus_system;

-- ── 1. Admin / Users ─────────────────────────────────────────
CREATE TABLE admin_users (
    id          BIGINT        AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(50)   NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,          -- BCrypt hash
    full_name   VARCHAR(100)  NOT NULL,
    email       VARCHAR(100)  NOT NULL UNIQUE,
    role        ENUM('SUPER_ADMIN','ADMIN','VIEWER') DEFAULT 'ADMIN',
    is_active   BOOLEAN       DEFAULT TRUE,
    created_at  DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── 2. Bus ───────────────────────────────────────────────────
CREATE TABLE buses (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    bus_number      VARCHAR(20)   NOT NULL UNIQUE,          -- e.g. DL-1C-1234
    bus_type        ENUM('AC','NON_AC','ELECTRIC','MINI') DEFAULT 'NON_AC',
    capacity        INT           NOT NULL,
    driver_name     VARCHAR(100),
    driver_contact  VARCHAR(15),
    is_active       BOOLEAN       DEFAULT TRUE,
    created_at      DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── 3. Route ─────────────────────────────────────────────────
CREATE TABLE routes (
    id                  BIGINT        AUTO_INCREMENT PRIMARY KEY,
    route_number        VARCHAR(20)   NOT NULL UNIQUE,      -- e.g. Route-404
    route_name          VARCHAR(150)  NOT NULL,
    source_stop         VARCHAR(100)  NOT NULL,
    destination_stop    VARCHAR(100)  NOT NULL,
    total_distance_km   DECIMAL(7,2),
    total_stops         INT           DEFAULT 0,
    fare                DECIMAL(6,2)  DEFAULT 0.00,
    is_active           BOOLEAN       DEFAULT TRUE,
    created_at          DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ── 4. Route Stops (intermediate stops with sequence) ────────
CREATE TABLE route_stops (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    route_id        BIGINT        NOT NULL,
    stop_name       VARCHAR(100)  NOT NULL,
    stop_sequence   INT           NOT NULL,                 -- order in route
    distance_from_source_km DECIMAL(7,2),
    UNIQUE KEY uq_route_seq (route_id, stop_sequence),
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
);

-- ── 5. Schedule ──────────────────────────────────────────────
CREATE TABLE schedules (
    id              BIGINT        AUTO_INCREMENT PRIMARY KEY,
    route_id        BIGINT        NOT NULL,
    bus_id          BIGINT        NOT NULL,
    departure_time  TIME          NOT NULL,
    arrival_time    TIME          NOT NULL,
    schedule_days   SET('MON','TUE','WED','THU','FRI','SAT','SUN') NOT NULL DEFAULT 'MON,TUE,WED,THU,FRI',
    is_active       BOOLEAN       DEFAULT TRUE,
    created_at      DATETIME      DEFAULT CURRENT_TIMESTAMP,
    updated_at      DATETIME      DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE,
    FOREIGN KEY (bus_id)   REFERENCES buses(id)  ON DELETE CASCADE
);

-- ── Indexes ──────────────────────────────────────────────────
CREATE INDEX idx_schedule_route   ON schedules (route_id);
CREATE INDEX idx_schedule_bus     ON schedules (bus_id);
CREATE INDEX idx_route_stops_route ON route_stops (route_id);

-- ── Sample seed data ─────────────────────────────────────────
INSERT INTO admin_users (username, password, full_name, email, role) VALUES
  ('admin', '$2a$12$dummyHashForDev', 'DTC Administrator', 'admin@dtc.gov.in', 'SUPER_ADMIN');

INSERT INTO buses (bus_number, bus_type, capacity, driver_name, driver_contact) VALUES
  ('DL-1C-0001', 'AC',      50, 'Ramesh Kumar',  '9876543210'),
  ('DL-1C-0002', 'NON_AC',  60, 'Suresh Sharma', '9876543211'),
  ('DL-1C-0003', 'ELECTRIC',45, 'Vijay Singh',   '9876543212');

INSERT INTO routes (route_number, route_name, source_stop, destination_stop, total_distance_km, fare) VALUES
  ('R-001', 'ISBT Kashmere Gate → Dwarka Sector 21', 'ISBT Kashmere Gate', 'Dwarka Sector 21', 28.5, 25.00),
  ('R-002', 'Anand Vihar → Nehru Place',              'Anand Vihar',        'Nehru Place',      22.0, 20.00),
  ('R-003', 'Rohini Sector 18 → Saket',               'Rohini Sector 18',   'Saket',            30.0, 27.00);

INSERT INTO route_stops (route_id, stop_name, stop_sequence, distance_from_source_km) VALUES
  (1, 'ISBT Kashmere Gate',  1,  0.0),
  (1, 'Delhi Gate',          2,  3.2),
  (1, 'ITO',                 3,  5.8),
  (1, 'Lajpat Nagar',        4, 12.0),
  (1, 'Saket',               5, 18.5),
  (1, 'Dwarka Sector 10',    6, 24.0),
  (1, 'Dwarka Sector 21',    7, 28.5);

INSERT INTO schedules (route_id, bus_id, departure_time, arrival_time, schedule_days) VALUES
  (1, 1, '06:00:00', '08:30:00', 'MON,TUE,WED,THU,FRI,SAT'),
  (1, 2, '09:00:00', '11:30:00', 'MON,TUE,WED,THU,FRI,SAT,SUN'),
  (2, 3, '07:30:00', '09:15:00', 'MON,TUE,WED,THU,FRI');
