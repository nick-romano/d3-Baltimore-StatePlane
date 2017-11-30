import json, requests, os

#api key, get yer own
key = '*'

def getInfo(e):
	r = requests.get(e)
	return r.json()


with open('mdb.json', 'rb') as f:
	#print(f)
	data = f.read()
	data = json.loads(data)
	for i in range(0,len(data['features'])):
		#print(data['features'][0]['properties']['GEOID'])
		county = str(data['features'][i]['properties']['COUNTYFP'])
		state = str(data['features'][i]['properties']['STATEFP'])
		BLKGRP = str(data['features'][i]['properties']['BLKGRPCE'])
		TRACT = str(data['features'][i]['properties']['TRACTCE'])
		url = "https://api.census.gov/data/2015/acs5?get=NAME,B01003_001E,B25001_001E,B25002_002E,B25002_003E,BLKGRP,B19013_001E,B19013_001M&for=block group:%s&in=state:%s county:%s tract:%s&key=%s" % (BLKGRP, state, county, TRACT,key)
		url = url.replace(" ", "%20")
		#print(url)
		censusdata = getInfo(url)
		data['features'][i]['properties']['NAME'] = censusdata[1][0]
		data['features'][i]['properties']['TOTALPOPULATION'] = censusdata[1][1]
		data['features'][i]['properties']['HOUSINGUNITS'] = censusdata[1][2]
		data['features'][i]['properties']['OCCUPIED'] = censusdata[1][3]
		data['features'][i]['properties']['VACANT'] = censusdata[1][4]
		data['features'][i]['properties']['MHI'] = censusdata[1][6]
		data['features'][i]['properties']['MHIE'] = censusdata[1][7]
		

	with open('mdmhi.json', 'wb') as wf:
		json.dump(data, wf)
