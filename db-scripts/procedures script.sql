#agregar datos de gastos
DELIMITER $$
CREATE PROCEDURE agregarGastos(
montoP varchar(15), 
descripcionP varchar(50), 
responsableP varchar(50),
departamentoP varchar(50)
)
Begin
	insert into gastos (monto, descripcion, responsable, departamento, fecha) values (CAST(montoP AS DECIMAL(15,3)), descripcionP, responsableP, departamentoP, curdate());
end 
$$

#ver los gastos segun el mes
DELIMITER $$
CREATE PROCEDURE gastosMes (mes int, anio int)
BEGIN
select monto, descripcion, responsable, departamento from gastos where MONTH(fecha) = mes and YEAR(fecha) = anio;
END
$$

#ver los gastos totales de un mes especifico
DELIMITER $$
CREATE PROCEDURE totalMes (mes int, anio int)
BEGIN
select SUM(monto) from gastos where MONTH(fecha) = mes and YEAR(fecha) = anio;
END
$$

#ver los 3 departamentos con mas gastos
DELIMITER $$
CREATE PROCEDURE masGastosDep ()
BEGIN
select departamento, sum(monto) from gastos group by departamento order by sum(monto) desc limit 3;
END
$$

DELIMITER $$
CREATE PROCEDURE verTodo ()
BEGIN
select * from gastos;
END
$$

DELIMITER $$
CREATE PROCEDURE getReportYears ()
BEGIN
select Year(fecha) from gastos group by year(fecha) order by year(fecha) asc;
END
$$

#call verTodo()
#call getReportYears()
#call agregarGastos("10101", "libros","carlos", "matematica")
#call agregarGastos("12312", "material laboratorio","miguel", "fisica")
#call agregarGastos("23245", "fotocopias examenes","mariana", "fisica")
#call agregarGastos("5673", "bolas de ping pong","beto", "deportiva")
#call agregarGastos("12000", "redes de baloncesto","fabian", "deportiva")
#call agregarGastos("5435346", "equipo de laboratorio","tomas", "electronica")
#call agregarGastos("12443523", "carro nuevo","wajib", "electronica")


#update gastos set fecha = '2021-10-10' where departamento = "deportiva";
#update gastos set fecha = '2022-9-9' where departamento = "electronica";
#update gastos set fecha = '2022-10-10' where departamento = "matematica";
#update gastos set fecha = '2022-11-11' where departamento = "fisica";

#call gastosMes(11,2022)
#call totalMes(11,2022)
#call masGastosDep()