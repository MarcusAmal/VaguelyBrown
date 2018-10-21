import mysql.connector

class DatabaseClass(object):
    def __init__(self, username, password, host,database):
        self.username = username
        self.password = password
        self.host = host
        self.dbname = database
        self.dbConn = self.makeConnection(self.username, self.password, self.host)
        self.dbCursor = self.makeCursor(self.dbConn)

    def makeConnection(self, username, password, host):
        try:
            newDB = mysql.connector.connect(
                user = username,
                password = password,
                host = host)
        except mysql.connector.Error as err:
            if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
               print("Incorrect Server Login Credentials")
        return newDB

    def makeCursor(self, databaseConn):
        cursor = databaseConn.cursor()
        return cursor

    def createDB(self,cursor,databaseConn,dbname):
        cursor.execute("CREATE DATABASE IF NOT EXISTS "+dbname)
        databaseConn.database = dbname

    def createTables(self, cursor):
        cursor.execute("""CREATE TABLE IF NOT EXISTS User_Info(
                        Time_Stamp int(12) NOT NULL,
                        User_Id char(100) NOT NULL,
                        Pinterest_Id char(100) NOT NULL)""")
        cursor.execute("""CREATE TABLE IF NOT EXISTS Pinterest_Info(
                        Pinterest_Id char(100) NOT NULL,
                        Top char(100),
                        Bottom char(100),
                        Shoes char(100))""")
        cursor.execute("""CREATE TABLE IF NOT EXISTS Pinterest_Links{
                        Pinterest_ID char(100) NOT NULL,
                        URL_top char(300),
                        URL_bottom char(300),
                        URL_shoes char(300))""")
    
    def addData(self, cursor, dataList):
        insertData1 = "INSERT INTO User_Info (Time_Stamp, User_Id, Pinterest_Id) VALUES (%s, %S, %s)"
        val = dataList[:3]
        self.cursor.execute(insertData1, val)
        insertData2 = "INSERT INTO Pinterest_Info (Pinterest_Id, Top, Bottom, Shoes) VALUES (%s, %s, %s, %s)"
        val = dataList[2:]
        self.cursor.execute(insertData2, val)
        #insertData3 = "INSERT INTO Pinterest_Links (Pinterest_Id, URL_Top, URL_Bottom, URL_Shoes) VALUES (%s, %s, %s, %s)
        #needs to run a method tht retrieves amazon urls based on inserted data.

    def checkForSimilar(self, cursor, pinterestId):
        self.cursor.execute("SELECT Pinterest_Id FROM User_Info")
        userInfoPinterest = self.cursor.fetchAll()
        count = 0
        for x in userInfo :
            if x == pinterestId:
                break
            else:
                count = count + 1
        self.cursor.execute("SELECT User_Id FROM User_Info")
        userInfoId = self.cursor.fetchAll()
        count2 = 0
        userId = []
        for x in userInfoId:
            if count2 == count:
                userId.append(x)
            else:
                count2 = count2 + 1
        return userId







                
