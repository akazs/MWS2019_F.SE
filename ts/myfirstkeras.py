import numpy as np
import json
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Input

with open('whitelist/AlexaWhite.json') as f:
    whiltedict = json.load(f)
whitedata = np.array(list(map(lambda x: ord(x[0])/127,whiltedict.keys())))
whitelabel = [1] * whitedata.size
blackdata = np.array(list(map(lambda x: ord(x[0])/127,json.load(open('blacklist/ds3spa.json')).keys())))
blacklabel = [0] * blackdata.size
data = np.hstack((whitedata, blackdata))
labels = np.array(whitelabel + blacklabel)

model = Sequential()
model.add(Dense(4, input_dim=1, activation="tanh"))
model.add(Dense(1, activation="sigmoid"))
model.compile(loss="binary_crossentropy", optimizer="sgd", metrics=["accuracy"])
model.summary()

from tensorflow.keras.callbacks import ModelCheckpoint, Callback
import tensorflow as tf
# Callbackを定義し、モデル保存の追加
li_cb = []
li_cb.append(ModelCheckpoint('./model.hdf5', save_best_only=True))

model.fit(data, labels, epochs=200, validation_split=0.2,callbacks=li_cb)
tf.contrib.saved_model.save_keras_model(model, './models/keras_export')
model.save('my_model.h5')
