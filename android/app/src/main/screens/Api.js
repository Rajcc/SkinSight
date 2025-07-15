

export async function handlepredictionandnavigation(imageUri,navigation,setLoading) {//setloading here is generic,points to galler and camera
   
 try{
    setLoading(true);
    const formData=new FormData();
    formData.append('image',{
        uri:imageUri,
        name:'photo.jpg',
        type:'image/jpg',
    });
          
        const predictRes=await fetch('http://10.0.2.2:5000/predict',{
          method:'POST',
          body:formData
        });
        if (!predictRes.ok){
          const ertxt=await predictRes.text();
          console.log('predict API error',ertxt);
          throw new Error('predict Api failed with status'+predictRes.status)
        }
        const predictData=await predictRes.json();
        console.log('prediction result:',predictData)

         let advice = 'We could not fetch AI-based advice right now. Please try again later.';
        
        try {
        const askRes=await fetch('http://10.0.2.2:5000/ask',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            question:`What is ${predictData.prediction}.its causes,remedies,daily care ?`,

          }),
        });
        if (askRes.ok) {
        const askData = await askRes.json();
        advice = askData.reply;
      } else {
        const errorText = await askRes.text();
        console.error('⚠️ Ask API failed:', errorText);
      }
    } catch (err) {
      console.error('⚠️ Ask API crashed:', err.message);
    }

        navigation.navigate('Result',{
          imageUri,
          disease:predictData.prediction,
          advice,
        });
        

      }catch(err){
        console.error(err.message)
      }finally{
      setLoading(false);

       
 }
}

