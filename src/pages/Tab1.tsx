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
import "./Tab1.css";

const Tab1: React.FC = () => {
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
        message: 'Please fill all fields to calculate bmi',
        buttons: ['OK']
      })
      return
    }
    const bmi = +enteredWeight*1.0 / (+enteredHeight * +enteredHeight);
    setBmiResult(bmi);
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
    switch(true) {
      case (bmi <18.5): 
        text="Thin"
        break; 
      case (bmi >= 18.5 && bmi <24.9):
        text="Fit"
        break;
      case (bmi >=24.9 && bmi < 29.9):
        text="Pre obesity"
        break;
      case (bmi >=29.9 && bmi < 34.9):
        text="Obesity level I"
        break;
      case (bmi >=34.9 && bmi < 39.9):
        text="Obesity level II"
        break;
      default: 
        text="Obesity level III"
    }
    return text;
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel position="floating">Your weight</IonLabel>
                <IonInput
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
                  type="number"
                  placeholder="Enter your height (m)"
                  ref={heightInputRef}
                  onChange={() => handleChange(heightInputRef.current?.value)}
                ></IonInput>
              </IonItem>
            </IonCol>
            <IonCol size="12" className="ion-margin">
              <IonLabel>BMI: {bmiResult}</IonLabel>
            </IonCol>
            <IonCol size="12" className="ion-margin">
              <IonLabel>Result : {bmiToText(bmiResult)}</IonLabel>
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

export default Tab1;
