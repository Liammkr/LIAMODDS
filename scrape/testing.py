# Import database module.
from firebase_admin import db
from selenium import webdriver
from selenium.webdriver.common.by import By
import os
import json
import time
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from firebase_admin import credentials, db, initialize_app, storage
import datetime
cred = credentials.Certificate("refresh/keys.json")  # Replace with the path to your service account key file
firebase_app = initialize_app(cred, {
    'databaseURL': 'https://liamkrodds-default-rtdb.firebaseio.com/',  # Replace with your Firebase project's database URL
    'storageBucket': 'liamkrodds.appspot.com'  # Replace with your actual bucket name
})

# Get a database reference to our posts
ref = db.reference('liamkr/emails')

# Read the data at the posts reference (this is a blocking operation)
emails = ref.get()

for x in emails:
    print(emails[x]["email"])

