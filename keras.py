import numpy as np
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input


blackdata = np.array(list(map(lambda S:[ord(S[i]) for i in range(len(S))],json.load( open('blacklist/ds3spa.json')).keys())))
print(blackdata[0:10][:10])

with open('whitelist/AlexaWhite.json') as f:
    whiltedict = json.load(f)
whitedata = np.array(list(map(lambda x: ord(x[0])/127,whiltedict.keys())))