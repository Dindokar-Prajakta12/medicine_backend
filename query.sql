create database medicine;
use medicine;

create table users (
id INT auto_increment primary key,
name varchar(100) not null,
email varchar(100) unique not null,
password varchar(255) not null,
created_at timestamp default current_timestamp
);

select * from users;


alter table users ADD is_admin boolean default false;

create table medicine(
id int auto_increment primary key,
name varchar(255) not null,
brand varchar(255) not null ,
price decimal(10,2) not null ,
stock_quantity int not null,
created_at timestamp default current_timestamp

);




create table orders(
order_id int auto_increment primary key,
user_id int  not null,
total_price  decimal(10,2) not null,
order_date timestamp default current_timestamp
);

create table order_items (
order_item_id int auto_increment primary key , 
order_id int not null,
medicine_id int not null,
quantity int  not null,
price decimal(10,2) not null,

foreign key (order_id) references orders(order_id),
foreign key (medicine_id) references medicine(id)

);