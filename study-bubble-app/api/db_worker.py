#!/usr/bin/python
import sqlite3
DATABASE_NAME = "database.db"

def connect_to_db():
    conn = sqlite3.connect(DATABASE_NAME)
    return conn

def create_db_table():
    tables = [
        """CREATE TABLE IF NOT EXISTS StudyBubble(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                        color TEXT NOT NULL,
                        title TEXT NOT NULL,
                        location TEXT,
                        date TEXT, 
                        starts TEXT,
                        ends TEXT,
                        summary TEXT,
                        card_num INTEGER
            )
            """,
        """CREATE TABLE IF NOT EXISTS LCard(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                        front TEXT NOT NULL,
                        back TEXT,
                        study_bubble_id INTEGER
            )
            """
    ]
    db = connect_to_db()
    cursor = db.cursor()
    for table in tables:
        cursor.execute(table)

def insert_StudyBubble(StudyBubble):
    inserted_StudyBubble = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO StudyBubble (color, title, location, date,starts, ends,summary, card_num) VALUES (?, ?, ?, ?,?,?,?,?)", 
                    (StudyBubble['color'], StudyBubble['title'], 
                    StudyBubble['location'], StudyBubble['date'],
                    StudyBubble['starts'], StudyBubble['ends'], 
                    StudyBubble['summary'], StudyBubble['card_num'] ) )
        conn.commit()
        inserted_StudyBubble = get_StudyBubble_by_id(cur.lastrowid)
    except:
        conn().rollback()

    finally:
        conn.close()

    return inserted_StudyBubble

def get_StudyBubbles():
    StudyBubbles = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM StudyBubble")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            StudyBubble = {}
            StudyBubble["id"] = i["id"]
            StudyBubble['color'] = i['color']
            StudyBubble['title'] = i['title']
            StudyBubble['location'] = i['location']
            StudyBubble['date'] = i['date']
            StudyBubble['starts'] = i['starts']
            StudyBubble['ends'] = i['ends']
            StudyBubble['summary'] = i['summary']
            StudyBubble['card_num'] = i['card_num']
            StudyBubbles.append(StudyBubble)

    except:
        StudyBubbles = []

    return StudyBubbles


def get_StudyBubble_by_id(StudyBubble_id):
    StudyBubble = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM StudyBubble WHERE id = ?", 
                       (StudyBubble_id,))
        row = cur.fetchone()

        # convert row object to dictionary
        StudyBubble["id"] = row["id"]
        StudyBubble['color'] = row['color']
        StudyBubble['title'] = row['title']
        StudyBubble['location'] = row['location']
        StudyBubble['date'] = row['date']
        StudyBubble['starts'] = row['starts']
        StudyBubble['ends'] = row['ends']
        StudyBubble['summary'] = row['summary']
        StudyBubble['card_num'] = row['card_num']
    except:
        StudyBubble = {}

    return StudyBubble

def update_StudyBubble(StudyBubble):
    updated_StudyBubble = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE StudyBubble SET color = ?, title = ?, location = ?, date =?, starts =?, ends =?, summary=?, card_num=?, WHERE id =?",  
                     (StudyBubble['color'], StudyBubble['title'], 
                    StudyBubble['location'], StudyBubble['date'],
                    StudyBubble['starts'], StudyBubble['ends'], 
                    StudyBubble['summary'], StudyBubble['card_num'], 
                     StudyBubble["id"],))
        conn.commit()
        #return the user
        updated_StudyBubble = get_StudyBubble_by_id(StudyBubble["id"])

    except:
        conn.rollback()
        updated_StudyBubble = {}
    finally:
        conn.close()

    return updated_StudyBubble

def delete_StudyBubble(StudyBubble_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from StudyBubble WHERE id = ?",     
                      (StudyBubble_id,))
        conn.commit()
        message["status"] = "StudyBubble deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete StudyBubble"
    finally:
        conn.close()

    return message
# ------------------------------------------------------------------------------
def insert_LCard(LCard):
    inserted_LCard = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO LCard (front, back, study_bubble_id) VALUES (?, ?, ?)", 
                    (LCard['front'],   
                    LCard['back'], LCard['study_bubble_id']) )
        conn.commit()
        inserted_LCard = get_LCard_by_id(cur.lastrowid)
    except:
        conn().rollback()

    finally:
        conn.close()

    return inserted_LCard

def get_LCards():
    LCards = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM LCard")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            LCard = {}
            LCard["id"] = i["id"]
            LCard["front"] = i["front"]
            LCard["back"] = i["back"]
            LCard["study_bubble_id"] = i["study_bubble_id"]
            LCards.append(LCard)

    except:
        LCards = []

    return LCards


def get_LCard_by_id(LCard_id):
    LCard = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM LCard WHERE id = ?", 
                       (LCard_id,))
        row = cur.fetchone()

        # convert row object to dictionary
        LCard["id"] = row["id"]
        LCard["front"] = row["front"]
        LCard["back"] = row["back"]
        LCard["study_bubble_id"] = row["study_bubble_id"]
    except:
        LCard = {}

    return LCard

def update_LCard(LCard):
    updated_LCard = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE LCard SET front = ?, back = ?, study_bubble_id = ? WHERE id =?",  
                     (LCard["front"], LCard["back"], LCard["study_bubble_id"], 
                     LCard["id"],))
        conn.commit()
        #return the user
        updated_LCard = get_LCard_by_id(LCard["id"])

    except:
        conn.rollback()
        updated_LCard = {}
    finally:
        conn.close()

    return updated_LCard

def delete_LCard(LCard_id):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from LCard WHERE id = ?",     
                      (LCard_id,))
        conn.commit()
        message["status"] = "User deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete user"
    finally:
        conn.close()

    return message

def get_LCard_with_StudyBubble_id(StudyBubble_id):
    LCards = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM LCard WHERE study_bubble_id = ?",(StudyBubble_id))
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            LCard = {}
            LCard["id"] = i["id"]
            LCard["front"] = i["front"]
            LCard["back"] = i["back"]
            LCard["study_bubble_id"] = i["study_bubble_id"]
            LCards.append(LCard)

    except:
        LCards = []

    return LCards