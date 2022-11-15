from flask import Flask, jsonify

# Import the connector helper
from google.cloud.sql.connector import Connector, IPTypes

# This is different from the connector but is useful for using SQL in FLask
import sqlalchemy
import pymysql
import collections



# initialize Connector object
connector = Connector()

# Declare your database variables (these can be found in the Cloud Console)
db_user = 'root'
db_password = '1234'
db_name = 'baseSOA'
instance_connection_name = 'basedatosproyectosoa:us-central1:base-datos-soa' # ie: 'test-database-340201:us-central1:test-database'
db_socket_dir = "/cloudsql"




# function to return the database connection
def getconn() -> pymysql.connections.Connection:
    conn: pymysql.connections.Connection = connector.connect(
        instance_connection_name,
        "pymysql",
        user=db_user,
        password=db_password,
        db=db_name
    )
    return conn

# This is an example function that assumes your database has a table called 'users' with three columns

def get_top_expensers():
    pool = getconn()


    with pool.cursor() as db_conn:

        # query database
        query = "call masGastosDep()"
        db_conn.execute(query)
        result = db_conn.fetchall()

        # Do something with the results
        objects_list = []
        for row in result:
            d = collections.OrderedDict()
            d['Departamento'] = row[0]
            d['monto'] = row[1]
            objects_list.append(d)



        db_conn.close()
        return jsonify(objects_list)




app = Flask(__name__)

@app.route("/")
def homepage():
    return "Home"

@app.route("/docs")
def docs():
    return "docs"

@app.route("/about")
def about():
    return "aboasdut"

@app.route("/gastos")
def gastos():
    return get_top_expensers()

if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)