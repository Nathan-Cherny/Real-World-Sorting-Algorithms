import json

with open(r"C:\Users\comsc\OneDrive\Desktop\school memebers\Public_School_Characteristics_2022-23.geojson", "r") as f:
    data = json.load(f)

schoolMembers = {}
features = data["features"]
for schoolData in features:
    property = schoolData["properties"]
    if(property["MEMBER"] and property["MEMBER"] > 0):
        schoolMembers[property["SCH_NAME"]] = property["MEMBER"]

with open('schoolMembers.json', 'w') as f:
    json.dump(schoolMembers, f, indent=4)
