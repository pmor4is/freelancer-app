import React, { createContext, useState } from 'react';
import axios from 'axios';

export const JobsContext = createContext({});

const url = "https://freelancer-app-server.vercel.app/jobs"

export default function JobsProvider({ children }) {

    function getJobs() {
        fetch(url)
            .then((respFetch) => respFetch.json())
            .then((respJson) => setJobs(respJson))
            .catch((erro) => console.warn(erro))
    }

    function saveData() {
        console.log("gravar dados", url + id)
        if (id) {
            axios.put(url + id, {
                title: title,
                description: description,
                payment: payment,
                employer: employer,
                date: (date ? date : null),
                hour: (hour ? hour : null),
                local: (local ? local : null),
                transport: (transport ? transport : null),
            }).then((resp) => updateEditedList(resp)).catch((erro) => console.log(erro));
        } else {
            axios.post(url, {
                title: title,
                description: description,
                payment: payment,
                employer: employer,
                date: (date ? date : null),
                hour: (hour ? hour : null),
                local: (local ? local : null),
                transport: (transport ? transport : null),
            }).then((resp) => updateNewJob(resp)).catch((erro) => console.log(erro));
        }
    }

    function updateEditedList(response) {
        //ou usa-se a confirmacao pelo id retornado
        //ou usa-se um response.status == 20x com um if
        const id = response.data.identifier;//atualizar SLIDES ! 
        const { title, description, payment, employer, local, hour, date, transport } = JSON.parse(response.config.data);
        const index = jobs.findIndex(item => item.id == id);
        console.log(title, description, payment, employer, local, hour, date, transport);
        let jobs = jobs;
        jobs[index].title = title;
        jobs[index].description = description;
        jobs[index].payment = payment;
        jobs[index].employer = employer;
        jobs[index].local = (local ? local : "");
        jobs[index].date = (date ? date : "");
        jobs[index].hour = (hour ? hour : "");
        jobs[index].transport = (transport ? transport : "");
        setJobs(jobs);

        let job = {};
        job.id = id;
        job.title = title;
        job.description = description;
        job.payment = payment;
        job.employer = employer;
        job.local = local;
        job.date = date;
        job.hour = hour;
        job.transport = transport;
        setUpdate(job);
    }

    function updateNewJob(response) {
        let { id, title, description, payment, employer, date, hour, local, transport } = response.data;
        let obj = {
            "id": id,
            "title": title,
            "description": description,
            "payment": payment,
            "employer": employer,
            "date": date,
            "hour": hour,
            "local": local,
            "transport": transport,
        };
        let jobs = jobs;
        jobs.push(obj);
        setJobs(jobs);
        setUpdate(obj);
    }

    function deleteJob(cod) {
        axios.delete(url + cod)
            .then(() => {
                setJobs(jobs.filter(item => item.id !== cod));
            })
            .catch((erro) => console.log(erro))
    }

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [payment, setPayment] = useState("");
    const [date, setDate] = useState("");
    const [employer, setEmployer] = useState([]);
    const [local, setLocal] = useState([]);
    const [hour, setHour] = useState('');
    const [transport, setTransport] = useState('');
    const [jobs, setJobs] = useState([]);
    const [update, setUpdate] = useState({});


    return (
        <JobsContext.Provider value={{ id, setId, title, setTitle, description, setDescription, payment, setPayment, date, setDate, employer, setEmployer, local, setLocal, hour, setHour, transport, setTransport, jobs, setJobs, getJobs, updateEditedList, saveData, update, deleteJob }} >
            {children}
        </JobsContext.Provider>
    )
}