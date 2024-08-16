import { useState } from "react";
import { useForm } from "react-hook-form"

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const [submission, setSubmission] = useState('IDLE');

  const onSubmit = async(data) => {
    try {
      await fetch(
        "http://localhost:8080/api/sentiment",
        {
          method: "POST",
          headers: {"Content-Type":'application/json'},
          body: JSON.stringify({
            client: {
              id: 28,  // Remplacez par l'ID souhaité
              email: data.email,
              telephone: "54", // Remplacez par le numéro de téléphone souhaité
            },
            texte: data.avis,
          })
        }
      );
      setSubmission('SUCCESS');
      reset();
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className="bg-blue-700 text-white">
      <div className="container flex flex-col h-screen justify-center">
        <h2 className="text-3xl mb-4 px-56">Merci de nous transmettre votre avis</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="text-xl px-56 flex flex-col gap-y-5">
          <div className="form-group flex flex-col">
            <label htmlFor="avis">Votre avis</label>
            <textarea {...register("avis", { required: true })} id="avis" rows="4" className="resize-none p-2 rounded-md text-gray-700"></textarea>
            {errors.avis && <span className="text-rose-600">Ce champ est requis</span>}
          </div>
          <div className="form-group flex flex-col">
            <label htmlFor="email">Votre email</label>
            <input {...register("email", { required: true })} type="email" name="email" id="email" className="p-2 rounded-md text-slate-700"></input>
            {errors.email && <span className="text-rose-600">Ce champ est requis</span>}
          </div>
          <div className="form-group flex flex-col">
            <button type="submit" className="p-2 rounded-md bg-green-700">Enregistrer</button>
          </div>
          {submission === 'SUCCESS' && <p className="p-2 rounded-md bg-green-400">Votre avis a bien été enregsitré !</p>}
        </form>
      </div>
    </section>
  );
}

export default App;
