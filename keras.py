import numpy as np
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input


blackdata = np.array(list(map(lambda S:[ord(S[i]) for i in range(len(S))],json.load( open('blacklist/ds3spa.json')).keys())))
print(blackdata[0:10][:10])

whitedata = np.array(list(map(lambda S:[ord(S[i]) for i in range(len(S))],json.load( open('whitelist/AlexaWhite.json')).keys())))

print(whitedata[:10][:10])