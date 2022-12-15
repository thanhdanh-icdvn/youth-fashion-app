import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { calculatorOutline, refreshCircleOutline } from "ionicons/icons";
import { useRef, useState } from "react";
import "./BMICalculator.module.css";

const BMICalculator: React.FC = () => {
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const [bmiResult,setBmiResult] = useState<number>(0);
  const [presentAlert] = useIonAlert();

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    if( !enteredWeight || !enteredHeight) {
      presentAlert({
        header: 'Alert',
        message: 'Please fill all fields to calculate the BMI',
        buttons: ['OK']
      })
      return
    }
    const bmi = +enteredWeight*1.0*10000 / (+enteredHeight * +enteredHeight);
    const bmiFixed = Number.parseFloat(bmi.toFixed(2))
    setBmiResult(bmiFixed);
  }
  const handleReset = () => {
    weightInputRef.current!.value="";
    heightInputRef.current!.value="";
    setBmiResult(0)
  }
  const handleChange = (val: any) => {
    console.info(val)
  }

  const bmiToText = (bmi: number) => {
    let text="";
    let bmiRange="";
    switch(true) {
      case (bmi <18.5): 
        // Gầy
        text="Thin"
        bmiRange="<18.5"
        break; 
      case (bmi >= 18.5 && bmi <24.9):
        // Vừa
        text="Fit"
        bmiRange="18.5 - 24.9"
        break;
      case (bmi >=24.9 && bmi < 29.9):
        // Tiền béo phì
        text="Pre obesity"
        bmiRange="24.9 - 29.9"
        break;
      case (bmi >=29.9 && bmi < 34.9):
        // Béo phì cấp I
        text="Obesity level I"
        bmiRange="29.9 - 34.9"
        break;
      case (bmi >=34.9 && bmi < 39.9):
        // Béo phì cấp II
        text="Obesity level II"
        bmiRange="34.9 - 39.9"
        break;
      default: 
        // Béo phì cấp III
        text="Obesity level III"
        bmiRange="> 39.9"
    }
    return {text,bmiRange};
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI(Body Mass Index) Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Your weight</IonLabel>
                <IonInput
                  name="weight"
                  type="number"
                  placeholder="Enter your weight (kg)"
                  ref={weightInputRef}
                  onChange={() => handleChange(weightInputRef.current?.value)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Your height</IonLabel>
                <IonInput
                  name="height"
                  type="number"
                  placeholder="Enter your height (cm)"
                  ref={heightInputRef}
                  onChange={() => handleChange(heightInputRef.current?.value)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12" className="ion-margin">
              <IonLabel>BMI: {bmiResult}</IonLabel>
            </IonCol>
            <IonCol size="12" className="ion-margin">
              <IonLabel>BMI Range: {bmiToText(bmiResult).bmiRange}</IonLabel>
            </IonCol>
            <IonCol size="12" className="ion-margin">
              <IonLabel>Result : {bmiToText(bmiResult).text}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid className="ion-text-center ion-margin">
          <IonRow>
            <IonCol size="6">
              <IonButton expand="block" shape="round" onClick={calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
                </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton expand="block" shape="round" onClick={handleReset}>
                <IonIcon slot="start" icon={refreshCircleOutline}></IonIcon>
                Reset</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BMICalculator;
