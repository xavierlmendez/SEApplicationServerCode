select * from restaurant;
insert into restaurant (name, xCor, yCor, email, phone) values("Starbucks UTD campus", "32.986259", "-96.749277", "startbucks@starbucks", "628-123-3022");
insert into restaurant (name, xCor, yCor, email, phone) values("Taco Cabana", "32.9985412","-96.8054447", "tacos@cabanabucks", "826-123-3022");
insert into restaurant (name, xCor, yCor, email, phone) values("Taco Bell UTD campus", "32.9985314","-96.8056164", "tacobell@no.com", "628-123-3022");
insert into menu (restaurant, menu) values(4,'
	[{"items":
		[{"name":"caramel macciato", "cost":"4.00", "status":"available"},
			{"name":"macha latte", "cost":"3.50", "status":"available"},
            {"name":"hot cocoa", "cost":"3.00", "status":"unavailable"}
            ]
	}]' );
insert into menu (restaurant, menu) values(5,'
[{"items":[{"name":"bean and cheese taco", "cost":"1.29", "status":"available"},{"name":"chicken fajita", "cost":"2.50", "status":"unavailable"},{"name":"steak burrito group pack", "cost":"43.50", "status":"available"} ]}]' );
insert into menu (restaurant, menu) values(6,'
[{"items":[{"name":"burrito", "cost":"1.84", "status":"available"},{"name":"rice and bean burrito", "cost":"1.29", "status":"available"},{"name":"steak quesidilla", "cost":"4.98", "status":"available"} ]}]' );
select * from menu;

insert into foodys.user (username, email, password, phone_number) values("maybeXavi", "notXavi@xavi.com", "123321", "123-321-1243");
insert into foodys.user (username, email, password, phone_number) values("Xavi", "Xavi@yupItsXavi.com", "321321", "567-098-1467");
insert into foodys.user (username, email, password, phone_number) values("noXavi", "Xavi@com.com", "321321", "321-123-3421");
select * from user;

insert into foodys.Driver (user_name, email, passwd, phone) values("maybeXavidriver", "notXavi@xavidriver.com", "123321driver", "123-321-1243");
insert into foodys.Driver (user_name, email, passwd, phone) values("Xavidriver", "Xavi@yupItsXavidriver.com", "321321driver", "567-098-1467");
insert into foodys.Driver (user_name, email, passwd, phone) values("noXavidriver", "Xavi@comdriver.com", "321321driver", "321-123-3421");
select * from Driver;

insert into Orders (restaurant, customer, Orders.order) values(4, 2, '[{
	"items":
	[	{"name":"caramel macciato", "size":"grande", "cost":"4.00", "quantity":"1", "modifications":"none"}
        ]
}]');
insert into Orders (restaurant, customer, Orders.order) values(5, 1, '[{
	"items":
	[	{"name":"bean and cheese taco", "size":"N/A", "cost":"1.29", "quantity":"2", "modifications":"none"},
            	{"name":"chicken fajita", "size":"N/A", "cost":"2.50", "quantity":"2", "modifications":"add queso"}
        ]
}]');
select * from Orders;