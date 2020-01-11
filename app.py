import os
import json
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import MetaData, Table, Column, ForeignKey, String, Integer
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from flask import Flask, render_template


app = Flask(__name__)


'''these are for preview purposes'''
import pandas as pd
import numpy as np


# Database Setup 


app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/happiness.sqlite"
db = SQLAlchemy(app)

engine = create_engine("sqlite:///db/happiness.sqlite")

'''Data must have unique primary keys: the first entire portion of the project 
    is transferring the csv data to sqlite using sqlite studio and importing/ editing'''
# Create a metadata instance
metadata = MetaData(engine)
# we can reflect classes from a database
metadata.reflect(engine)


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

session = Session(engine)


# PREVIEWING with pandas
Year2019 = Base.classes.year2019
Year2018 = Base.classes.year2018

stmt = db.session.query(Year2019).statement
df = pd.read_sql_query(stmt, db.session.bind)
df1=df.loc[:,['Countryorregion','Score','Overallrank', 'GDPpercapita','Socialsupport', \
                      'Healthylifeexpectancy','Freedomtomakelifechoices','Generosity','Perceptionsofcorruption']]
df2=df1.to_dict()
sel = [
        Year2019.Overallrank,
        Year2019.Countryorregion,
        Year2019.Score,
        Year2019.GDPpercapita,
        Year2019.Socialsupport,
        Year2019.Healthylifeexpectancy,
        Year2019.Freedomtomakelifechoices,
        Year2019.Generosity,
        Year2019.Perceptionsofcorruption
    ]

results = db.session.query(*sel).filter().all()
alllist=[]

df1=df.loc[:,['GDPpercapita','Socialsupport', \
                      'Healthylifeexpectancy','Freedomtomakelifechoices','Generosity','Perceptionsofcorruption']]
        
dfmean=df1.mean()
dfmeanindexlist=dfmean.index.values.tolist()
dfmeanvaluelist=dfmean.values.tolist()

# using naive method to convert lists to dictionary 
dfmeandict = { 'indexes': dfmeanindexlist, 'means' : dfmeanvaluelist } 

with open('./db/2018.json') as json_file:
        datas=json.load(json_file)


@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

'''include all alternate routes here'''
@app.route("/worldview2018")
def worldview2018():
    """go to worldview 2018 page."""
    return render_template("worldview2018.html")

@app.route("/factors")
def factors():
    """Return the factors page."""
    return render_template("factors.html")


'''Include factors 2018 2019'''

'''include worldview 2018 2019'''











@app.route("/years")
def years():
    #Return a list of years for the selection
    Years=["year2019", "year2018"]
    
    # Return a list of the years
    return jsonify(Years)


@app.route("/metadata/<year>")
def year2019(year):
    """Return the MetaData for a given sample."""

    if year=="year2019":
        sel = [
                Year2019.Overallrank,
                Year2019.Countryorregion,
                Year2019.Score,
                Year2019.GDPpercapita,
                Year2019.Socialsupport,
                Year2019.Healthylifeexpectancy,
                Year2019.Freedomtomakelifechoices,
                Year2019.Generosity,
                Year2019.Perceptionsofcorruption
            ]
        
        results = db.session.query(*sel).filter().all()


        return jsonify(results)

    else:
        sel = [
                Year2018.Overallrank,
                Year2018.Countryorregion,
                Year2018.Score,
                Year2018.GDPpercapita,
                Year2018.Socialsupport,
                Year2018.Healthylifeexpectancy,
                Year2018.Freedomtomakelifechoices,
                Year2018.Generosity,
                Year2018.Perceptionsofcorruption
            ]
        
        results = db.session.query(*sel).filter().all()


        return jsonify(results)




#This route should provide all graphs with data if they use the object.values(bargraph_data[][])
@app.route("/chartdata/<year>")
def chartdatas(year):
    """Return the x and y for bar chart."""

    if year=="year2019":
        stmt = db.session.query(Year2019).statement
        df = pd.read_sql_query(stmt, db.session.bind)
        df1=df.loc[:,:]
        results = df1.to_dict()
        '''
        dict is autolabeled alphabetical order: 
        [0]Countryorregion
        [1] Freedomtomakelifechoices
        [2] GDPpercapita
        [3] Generosity
        [4] Healthylifeexpectancy
        [5] Overallrank
        [6] Perceptionsofcorruption
        [7] Score
        [8] Socialsupport
        '''
        return jsonify(results)

    else:
        stmt = db.session.query(Year2018).statement
        df = pd.read_sql_query(stmt, db.session.bind)
        df1=df.loc[:,:]
        results = df1.to_dict()


        return jsonify(results)
 
    

@app.route("/avgbarchartdata/<year>")
def avgbarchartdatas(year):
    """Return the x and y for bar chart."""

    '''
        dict is autolabeled alphabetical order: 
        [0] Freedomtomakelifechoices
        [1] GDPpercapita
        [2] Generosity
        [3] Healthylifeexpectancy
        [4] Perceptionsofcorruption
        [5] Socialsupport
        '''

    if year=="year2019":
        stmt = db.session.query(Year2019).statement
        df = pd.read_sql_query(stmt, db.session.bind)
        df1=df.loc[:,['GDPpercapita','Socialsupport', \
                      'Healthylifeexpectancy','Freedomtomakelifechoices','Generosity','Perceptionsofcorruption']]
        
                        
        dfmean=df1.mean()
        dfmeanindexlist=dfmean.index.values.tolist()
        dfmeanvaluelist=dfmean.values.tolist()
        
        # using naive method to convert lists to dictionary 
        dfmean=df1.mean()
        dfmeanindexlist=dfmean.index.values.tolist()
        dfmeanvaluelist=dfmean.values.tolist()
        
        # using naive method to convert lists to dictionary 
        dfmeandict = { 'indexes': dfmeanindexlist, 'means' : dfmeanvaluelist } 


        return jsonify(dfmeandict)



    else:
        stmt = db.session.query(Year2018).statement
        df = pd.read_sql_query(stmt, db.session.bind)
        df1=df.loc[:,['GDPpercapita','Socialsupport', \
                      'Healthylifeexpectancy','Freedomtomakelifechoices','Generosity','Perceptionsofcorruption']]
        
        dfmean=df1.mean()
        dfmeanindexlist=dfmean.index.values.tolist()
        dfmeanvaluelist=dfmean.values.tolist()
        
        # using naive method to convert lists to dictionary 
        dfmean=df1.mean()
        dfmeanindexlist=dfmean.index.values.tolist()
        dfmeanvaluelist=dfmean.values.tolist()
        
        # using naive method to convert lists to dictionary 
        dfmeandict = { 'indexes': dfmeanindexlist, 'means' : dfmeanvaluelist }        


        return jsonify(dfmeandict)  

@app.route("/jsondata/<year>")
def jsondata(year):
	#upload json data
    if year=="year2019":
        with open('./db/2019.json') as json_file:
            data=json.load(json_file)
            
        return(jsonify(data))
        
    else:
        with open('./db/2018.json') as json_file:
            data=json.load(json_file)
            
        return(jsonify(data))


if __name__ == "__main__":
    app.run()