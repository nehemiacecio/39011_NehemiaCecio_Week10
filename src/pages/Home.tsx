import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import "./Home.css";
import React, { useEffect, useRef, useState } from "react";
import { Student } from "../Student";

const Home: React.FC = () => {
  const [data, setData] = useState("");
  const url = "http://localhost/cross10/";
  const [students, setStudents] = useState<Student[]>([]);
  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);

  const [selectedFile, setSelectedFile] = useState<File>();

  const [alertMsg] = useIonAlert();

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = nama.current?.value as string;

    formData.append("nim", inNim);
    formData.append("nama", inNama);
    formData.append("prodi", inProdi);
    formData.append("foto", selectedFile as File);

    fetch(url.concat("insert_new_student.php"), {
      method: "post",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        setData(data);
        const dataObj = JSON.parse(data);
        console.log(dataObj);
        alertMsg({
          message: dataObj["message"],
          header: dataObj["success"] === 1 ? "Success" : "Failed",
          buttons: ["Ok"],
        });
      });
  };

  const getAllDataHandler = () => {
    fetch(url.concat("select_all_students.php"))
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetch(url.concat("select_all_students.php"))
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data.students);
        setStudents(data.students);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow>
            <IonCol className={"ion-text-center"}>
              <h1>Insert New Student</h1>
            </IonCol>
          </IonRow>
          <IonItem>
            <IonLabel position={"floating"}>NIM</IonLabel>
            <IonInput ref={nim} />
          </IonItem>
          <IonItem>
            <IonLabel position={"floating"}>Nama</IonLabel>
            <IonInput ref={nama} />
          </IonItem>
          <IonItem>
            <IonLabel position={"floating"}>Jurusan</IonLabel>
            <IonInput ref={prodi} />
          </IonItem>
          <IonItem>
            <input type={"file"} onChange={fileChangeHandler} />
          </IonItem>
          <IonButton expand={"full"} onClick={insertHandler}>
            Insert
          </IonButton>

          <IonRow>
            <IonCol className={"ion-text-center"}>
              <h1>All Data Student</h1>
            </IonCol>
          </IonRow>
          <IonButton
            expand={"block"}
            fill={"clear"}
            onClick={getAllDataHandler}
          >
            Get All Data
          </IonButton>
          {students.map((student) => (
            <IonItem key={student.nim}>
              <IonAvatar slot={"start"}>
                <img
                  src={
                    url + (student.foto ? student.foto : "uploads/nehemia.jpg")
                  }
                />
              </IonAvatar>
              <IonLabel>
                {student.nim} <br />
                {student.nama} <br />
                {student.prodi} <br />
                {student.foto}
              </IonLabel>
            </IonItem>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Home;
