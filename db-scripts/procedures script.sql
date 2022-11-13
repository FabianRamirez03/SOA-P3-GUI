#agregar datos de gastos
DELIMITER $$
CREATE PROCEDURE agregarGastos(
montoP decimal(15,3), 
descripcionP varchar(50), 
responsableP varchar(50),
departamentoP varchar(50)
)
Begin
	insert into gastos (monto, descripcion, responsable, departamento, fecha) values (montoP, descripcionP, responsableP, departamentoP, curdate());
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

#call agregarGastos(500000, "compra de osciloscopio","Juan Jose", "Electronica")
#select * from gastos
#update gastos set fecha = '2022-9-9' where departamento = "Electronica";
#call gastosMes(11,2022)
#call totalMes(11,2022)
#call masGastosDep()