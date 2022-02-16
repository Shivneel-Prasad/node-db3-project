-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
    select * from products as p
    left join categories as c 
        on p.productname = c.categoryname;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
    select o.OrderID, s.ShipperName, o.OrderDate
    from Orders as o
        left join shippers as s
            on o.ShipperID = s.ShipperID
            where o.OrderDate < '2012-08-09'
                order by o.OrderDate

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
    select productname, quantity, orderid
    from Products as p
        left join orderdetails as od
            on p.productid = od.productid
                where od.orderid = 10251
                    order by p.productname

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
    select o.id as orderID, c.CompanyName as customerCompanyName, emp.lastName = employeeName
      from orders as o
        join customers as c
            on o.CustomerID = c.CustomerID
        join employees as emp
            on o.employeeID = emp.employeeID
