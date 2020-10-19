--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: chest_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.chest_enum AS ENUM (
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55'
);


ALTER TYPE public.chest_enum OWNER TO postgres;

--
-- Name: color_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.color_enum AS ENUM (
    'white',
    'black',
    'beige',
    'navy',
    'blue',
    'multicolored'
);


ALTER TYPE public.color_enum OWNER TO postgres;

--
-- Name: gender_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_enum AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender_enum OWNER TO postgres;

--
-- Name: length_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.length_enum AS ENUM (
    '26',
    '28',
    '30',
    '32',
    '34',
    '36'
);


ALTER TYPE public.length_enum OWNER TO postgres;

--
-- Name: shirts_size_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.shirts_size_enum AS ENUM (
    'XS',
    'S',
    'M',
    'L',
    'XL',
    'XXL'
);


ALTER TYPE public.shirts_size_enum OWNER TO postgres;

--
-- Name: shoes_size_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.shoes_size_enum AS ENUM (
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13'
);


ALTER TYPE public.shoes_size_enum OWNER TO postgres;

--
-- Name: sleeve_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.sleeve_enum AS ENUM (
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55'
);


ALTER TYPE public.sleeve_enum OWNER TO postgres;

--
-- Name: type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.type_enum AS ENUM (
    'suits',
    'shirts',
    'pants',
    'shoes'
);


ALTER TYPE public.type_enum OWNER TO postgres;

--
-- Name: user_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.user_type_enum AS ENUM (
    'admin',
    'user',
    'disabled'
);


ALTER TYPE public.user_type_enum OWNER TO postgres;

--
-- Name: waist_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.waist_enum AS ENUM (
    '26',
    '28',
    '30',
    '32',
    '34',
    '36'
);


ALTER TYPE public.waist_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id uuid NOT NULL,
    name character(255) NOT NULL,
    type public.type_enum NOT NULL,
    image bytea,
    brand character(255),
    color public.color_enum NOT NULL,
    count integer NOT NULL,
    CONSTRAINT item_count CHECK ((count >= 0))
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: COLUMN items.type; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.items.type IS 'one of ''suits'', ''shirts'', ''pants'', ''shoes''';


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id uuid NOT NULL
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: pants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pants (
    id uuid NOT NULL,
    waist public.waist_enum NOT NULL,
    length public.length_enum NOT NULL
);


ALTER TABLE public.pants OWNER TO postgres;

--
-- Name: shirts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shirts (
    id uuid NOT NULL,
    size public.shirts_size_enum NOT NULL
);


ALTER TABLE public.shirts OWNER TO postgres;

--
-- Name: shoes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shoes (
    id uuid NOT NULL,
    size public.shoes_size_enum NOT NULL
);


ALTER TABLE public.shoes OWNER TO postgres;

--
-- Name: suits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suits (
    id uuid NOT NULL,
    chest public.chest_enum NOT NULL,
    sleeve public.sleeve_enum NOT NULL
);


ALTER TABLE public.suits OWNER TO postgres;

--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    item_id uuid NOT NULL,
    item_name character(255) NOT NULL,
    count integer NOT NULL,
    oynen character(255) NOT NULL,
    status character(255) NOT NULL,
    return_date date NOT NULL,
    is_returned boolean NOT NULL,
    CONSTRAINT "Transaction_oynen_check" CHECK ((oynen ~ '^[a-zA-Z0-9]*'::text)),
    CONSTRAINT "Transaction_status_check" CHECK (((status = 'pending'::bpchar) OR (status = 'complete'::bpchar) OR (status = 'cancelled'::bpchar) OR (status = 'late'::bpchar)))
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    oynen character(255) NOT NULL,
    type public.user_type_enum NOT NULL,
    pid character(255),
    email character(255),
    "firstItemDate" date,
    "numItemsReceived" integer DEFAULT 0 NOT NULL,
    CONSTRAINT "isEmail" CHECK ((email ~ '^[a-zA-Z0-9.!#$%&''*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$'::text)),
    CONSTRAINT ispid CHECK ((pid ~ '^[0-9]{9}$'::text))
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, name, type, image, brand, color, count) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id) FROM stdin;
\.


--
-- Data for Name: pants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pants (id, waist, length) FROM stdin;
\.


--
-- Data for Name: shirts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shirts (id, size) FROM stdin;
\.


--
-- Data for Name: shoes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shoes (id, size) FROM stdin;
\.


--
-- Data for Name: suits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.suits (id, chest, sleeve) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, order_id, item_id, item_name, count, oynen, status, return_date, is_returned) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (oynen, type, pid, email, "firstItemDate", "numItemsReceived") FROM stdin;
\.


--
-- Name: transactions Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: pants pants_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pants
    ADD CONSTRAINT pants_id_key UNIQUE (id);


--
-- Name: shoes shoes_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shoes
    ADD CONSTRAINT shoes_id_key UNIQUE (id);


--
-- Name: suits suits_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suits
    ADD CONSTRAINT suits_id_key UNIQUE (id);


--
-- Name: pants id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pants
    ADD CONSTRAINT id FOREIGN KEY (id) REFERENCES public.items(id);


--
-- Name: shirts shirts_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shirts
    ADD CONSTRAINT shirts_id_fkey FOREIGN KEY (id) REFERENCES public.items(id);


--
-- Name: shoes shoes_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shoes
    ADD CONSTRAINT shoes_id_fkey FOREIGN KEY (id) REFERENCES public.items(id);


--
-- Name: suits suits_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suits
    ADD CONSTRAINT suits_id_fkey FOREIGN KEY (id) REFERENCES public.items(id);


--
-- PostgreSQL database dump complete
--

