import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from firebase_admin import credentials, db, initialize_app, storage
import datetime

# Initialize Firebase app with service account credentials
cred = credentials.Certificate("keys.json")  # Replace with the path to your service account key file
firebase_app = initialize_app(cred, {
    'databaseURL': 'https://liamkrodds-default-rtdb.firebaseio.com/',  # Replace with your Firebase project's database URL
    'storageBucket': 'liamkrodds.appspot.com'  # Replace 'your_storage_bucket_name' with your actual bucket name
})

def create_driver():
    options = Options()
    options.headless = True  # Run in headless mode
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-blink-features=AutomationControlled')  # Avoid detection
    options.add_argument('--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3')
    
    # Update the path to the ChromeDriver executable
    chrome_driver_path = 'chromedriver.exe'  # Change this to your actual path

    service = Service(chrome_driver_path)
    driver = webdriver.Chrome(service=service, options=options)

    # Additional settings to avoid detection
    driver.execute_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined})")
    
    return driver

def wait_for_variable(database_ref, variable_name):
    while True:
        variable_value = database_ref.child(variable_name).get()
        if variable_value == True:
            return True
        time.sleep(1)

def scrape_website(url, sport):
    driver = create_driver()
    driver.get(url)

    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'body')))
    
    # Retrieve all text content on the page
    all_text = driver.find_element(By.TAG_NAME, 'body').text
    print("All text content on the website:")
    #print(all_text)

    # Upload text content as a .txt file to Firebase Storage
    upload_text_to_firebase(all_text,sport)

    driver.quit()

def upload_text_to_firebase(text_content,sport):
    # Initialize the Realtime Database reference
    database_ref = db.reference('/liamkr')

    # Set the variable to false before uploading
    database_ref.update({'run_script': False})

    # Upload text content as a .txt file to Firebase Storage
    bucket = storage.bucket()
    blob = bucket.blob(sport)
    
    # Convert text content to bytes
    text_bytes = text_content.encode('utf-8')

    # Upload text content to Firebase Storage
    blob.upload_from_string(text_bytes, content_type='text/plain')

    print("Text content uploaded to Firebase Storage")

    # Get the URL of the uploaded file
    #uploaded_url = blob.generate_signed_url(datetime.timedelta(seconds=300), method='GET')

    # Add the uploaded URL to the database
    #database_ref.update({'uploaded_text_url': uploaded_url})

if __name__ == "__main__":
    while True:
        # Initialize the Realtime Database reference
        database_ref = db.reference('/liamkr')

        # Wait for the 'run_script' variable to become true
        wait_for_variable(database_ref, 'run_script')

        # Perform scraping when the variable becomes true
        url = "https://api.prizepicks.com/projections?league_id=7&per_page=250&state_code=CA&single_stat=true&game_mode=pickem"
        scrape_website(url, "NBA")
        url = "https://api.prizepicks.com/projections?league_id=2&per_page=250&state_code=CA&single_stat=true&game_mode=pickem"
        scrape_website(url, "MLB")
        url = "https://api.prizepicks.com/projections?league_id=8&per_page=250&state_code=CA&single_stat=true&game_mode=pickem"
        scrape_website(url, "NHL")
        url = "https://api.prizepicks.com/projections?league_id=3&per_page=250&state_code=CA&single_stat=true&game_mode=pickem"
        scrape_website(url, "WNBA")

        # Set the 'run_script' variable back to false
        database_ref.update({'run_script': False})
        time.sleep(300)