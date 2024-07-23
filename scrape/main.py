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

# Initialize the WebDriver (e.g., Chrome)
driver = webdriver.Chrome()
file_path = "file:///" + os.path.abspath("C:/Users/admin/Documents/LIAMODDS/scrape/test.html")
# Open the webpage
driver.get(file_path)

# Find the element by its ID
element = driver.find_element(By.ID, 'test')

# Get the text content of the element
text_content = element.text
obj = json.loads(text_content)
##print(obj)

# Close the WebDriver
driver.quit()

def take_screenshot(html_file, output_file, width=1200, height=800):
    options = Options()
    options.headless = True  # Run in headless mode
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')

    # Update the path to the ChromeDriver executable
    chrome_driver_path = 'scrape/chromedriver.exe'  # Change this to your actual path

    service = Service(chrome_driver_path)
    driver = webdriver.Chrome(service=service, options=options)

    try:
        # Set the viewport size
        driver.set_window_size(width, height)

        # Load the local HTML file
        file_url = "file:///" + os.path.normpath(html_file).replace('\\', '/')
        driver.get(file_url)

        # Wait for the page to load (adjust the timeout as needed)
        time.sleep(5)  # Example wait time, adjust as necessary
        
        # Take screenshot of the page
        driver.save_screenshot(output_file)
        print(f"Screenshot saved to: {output_file}")
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        driver.quit()
for x in obj["props"]:

    if float(x["over"]) >= 55:

        print(x["name"], x["over"], x["line"], x["market"])
        f = open("scrape/card.html", "w")
        f.write(f"""<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Centered Card with Image</title>
        <link rel="stylesheet" href="emailcss.css" />
    </head>
    <body>
        <div class="container2">
        <img
            src="https://raw.githubusercontent.com/Liammkr/WSTBET/main/LIAMODDSWHITE.png"
            alt="Your Image"
            class="img2"
        />
        </div>
        <div class="container">
        <div class="card">
            <img
            src="https://static.prizepicks.com/images/players/mlb/Jose_Siri_131182ce-81e4-410b-aaba-4a4fc6b7676b.webp"
            alt="Jose Siri"
            />
            <div class="info">
            <div class="player-info">
                <div>{x["name"]}</div>
            </div>
            <div class="points">{x["line"]}<span><br />{x["market"]}</span></div>
            <div class="buttons">
                <button class="less">LESS</button>
                <button class="right">MORE {x["over"]}</button>
            </div>
            </div>
        </div>
        </div>
    </body>
    </html>
    """)
        f.close()

        html_file = r"C:\Users\admin\Documents\LIAMODDS\scrape\card.html"  # Use raw string literal for file path
        output_file = "scrape/screenshot.png"
        take_screenshot(html_file, output_file, width=400, height=600)  # Adjust width and height as needed

        bucket = storage.bucket()
        timestamp = int(time.time())
        destination_path = f"emailimgs/{timestamp}.png"  # Adjust the destination path as needed
        blob = bucket.blob(destination_path)
        blob.upload_from_filename("scrape/screenshot.png")
        blob.make_public()
        image_url = blob.public_url
        print("Uploaded:",image_url)

        ref = db.reference('liamkr/emails')
        emails = ref.get()
        for x in emails:
            print(emails[x]["email"])
    elif float(x["under"]) >= 55:

        print(x["Name"], x["under"], x["line"], x["market"])




