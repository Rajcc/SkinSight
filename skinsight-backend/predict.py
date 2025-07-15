import sys
import tensorflow as tf 
import numpy as np
from PIL import Image
from keras.utils import load_img, img_to_array
import os

model_path=os.path.join(os.path.dirname(__file__),"skin_model.tflite")
if not os.path.exists(model_path):
    print("model not find",model_path)
    sys.exit(1)

class_names=["Acne","Atopic","Bullous pemphigoid","Dariers disease","Dermatitis","Dyshidrosis","Eczema","Hidradenitis","Keratolysis",
             "Pemphigus","Rosacea","Squamous_carcinoma","actinic-keratosis","basal-cell-carcinoma","benign familial","bowens disease",
             "epidermolysis","grovers disease","keratinic","lichen simplex","neurotic excoriat","perioral","pompholyx","prurigo",
             "stasis drmatitis"]

if len(sys.argv) < 2:
    sys.stderr.write("No image path provided\n")
    sys.exit(1)
img_path = sys.argv[1]
img=load_img(img_path,target_size=(224,224))
x=img_to_array(img)
x=np.expand_dims(x,axis=0)
x=x/255.0


interpreter=tf.lite.Interpreter(model_path=model_path)
interpreter.allocate_tensors()

input_details=interpreter.get_input_details()
output_details=interpreter.get_output_details()

interpreter.set_tensor(input_details[0]['index'],x.astype(np.float32))
interpreter.invoke()

output_data=interpreter.get_tensor(output_details[0]['index'])
pred=np.squeeze(output_data)
index=np.argmax(pred)


print(class_names[index])