import requests
from bs4 import BeautifulSoup
import time

def fetch_and_parse_website(url):
    try:
        # Send a GET request to the website
        response = requests.get(url)
        response.raise_for_status()  # Raise exception if request failed

        # Parse the content using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')

        # Extract and print the page title
        title = soup.title.string if soup.title else 'No Title Found'
        #print(f"Page Title: {title}\n")

        # Print all hyperlinks on the page
        #print("Hyperlinks found on the page:")
        for link in soup.find_all('a', href=True):
            #print(f"- {link.get('href')}")
            pass

    except requests.exceptions.RequestException as e:
        #print(f"Error fetching the website: {e}")
        pass
    
if __name__ == "__main__":
    url = "https://theobrucker.us"  # Replace with your target URL
    while(1):
        fetch_and_parse_website(url)
        time.sleep(1)