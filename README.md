I was lazy so I prepared a nice tool that helps to evaluate results coming from the form scanner.
Check out the screenshot in the attachment.

Software is here: https://drive.google.com/open?id=0B0qblIJxLpk3NlpidjhwOUJaTEU

To use it:

1. Open index.html in your browser
2. Load the csv file with results
3. This automatically generates the view from the screenshot
4. DONE

To upload results to vuws:

1. Click “Download Results”
2. Replace “REPLACE THIS” with the column name and ID coming from VUWS (download form from vuws)
3. Upload to vuws
4. DONE

To prepare input CSV file (check out the example file in “example/Results.csv” folder - do not distribute this file!!!)

1. If you want to see student names, download your student list from Allocate+
2. Paste them in the beginning of your CSV
3. For each version of the test:
   1. Put line with correct results, starting with empty column (not the comma in the beginning): e.g. “,A,B,C”
   2. Paste your result from form scanner
4. DONE

# Form Scanner

You need to `chmod +x` on bin file to run on MAC.

# Example CSV

```csv
18791734,Boodo,Purvil
17072676,Damdam,Derryn
19046234,Cole,Laurence

,B|C|E,A|C,B|E,B|C|D|E,A,A,C,E,C,D,A,B,A,D,E

img-904102051-Odd 68,C|D,A|D,A|B|C,B|D,A,A,C,C,D,D,D,B,A,C,A,,,,,,,,,,,,,,,,1,7,7,2,5,0,8,2
img-904102051-Odd 69,A|D,A|C|D,A|B|D,B|C|D|E,C,E,C,E,C,D,D,E,A,A,E,,,,,,,,,,,,,,,,1,8,7,2,9,6,9,4
img-904102051-Odd 86,C,A,B,C,E,D,C,C,C,D,A,B,A,D,E,,,,,,,,,,,,,,,,1,8,6,9,9,0,5,0

,A|C|D|E,B|E,A|D,A|C|E,E,D,C,C,C,I,B,A,B,A,E

img-904101937-Even 59,D,A,B,D,E,E,D,B,B,A,B,D,C,B,E,,,,,,,,,,,,,,,,1,8,7,9,1,7,7,2
img-904101937-Even 79,A|B|C|E,A,C|E,D|E,E,A,B,C,C,C,C,B,A,A,C,,,,,,,,,,,,,,,,1,8,0,5,1,2,3,0
img-904101937-Even 78,C|D,B|E,A|C,A|C|E,E,D,C,C,B,D,B,D,B,A,E,,,,,,,,,,,,,,,,1,7,9,7,0,6,4,2
```
