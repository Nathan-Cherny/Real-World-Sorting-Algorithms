import json

def schoolMembers(): # used for parsing school attendance data
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

def meteoriteMass(): # used for parsing mass of fallen meteorites
    meteorMasses = {}
    f = open("Meteorite_Landings.csv", "r", encoding="utf8")
    meteoriteStuffString = f.read()
    meteorites = meteoriteStuffString.split("\n")
    for meteor in meteorites[1:]:
        meteorData = meteor.split(",")
        if(len(meteorData) == 11): # greater than 0 so its a valid list, 
                                   # and 11 because normal lists are this length. some have additional, random commas

            name = meteorData[0]
            massStr = meteorData[4]

            if len(massStr) > 0: # mass isn't an empty string
                try:
                    mass = float(massStr)
                    mass = int(float(mass))
                    if(mass > 0): # actually has mass, valid meteor landing
                        meteorMasses[name] = mass
                except:
                    # invalid mass, some weird string. just ignore it
                    pass

    with open('meteorMasses.json', 'w') as f:
        json.dump(meteorMasses, f, indent=4)



meteoriteMass()
