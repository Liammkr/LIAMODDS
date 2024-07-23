import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
import os

def take_screenshot(html_file, output_file, width=1200, height=800):
    options = Options()
    options.headless = True  # Run in headless mode
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    # Update the path to the ChromeDriver executable
    chrome_driver_path = 'refresh/chromedriver.exe'  # Change this to your actual path

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

if __name__ == "__main__":
    html_file = r"C:\Users\admin\Documents\LIAMODDS\scrape\card.html"  # Use raw string literal for file path
    output_file = "screenshot.png"
    take_screenshot(html_file, output_file, width=400, height=600)  # Adjust width and height as needed