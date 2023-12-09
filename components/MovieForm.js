import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from '../styles/MovieForm.module.css'

function MovieForm({ initialMovieInfo, onSubmit }) {
  const { handleSubmit, control, setValue } = useForm({
    defaultValues: initialMovieInfo || {
      title: '',
      runtime: 0,
      overview: '',
      release_date: '',
      poster_path: '',
      genres: ''
    }
  });

  const handleFormSubmit = (data) => {
    onSubmit(data, "POST");
  };

  return (
    <div className={styles.movieForm}>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.formGroup}>
          <label htmlFor="title">Title</label>
          <Controller
            name="title"
            rules={{ required: 'Title is required' }}
            control={control}
            render={({ field }) => <input {...field} id="title" type="text" className={styles.input}/>}
          />
        </div>
        <div>
          <label htmlFor="runtime">Runtime</label>
          <Controller
            name="runtime"
            rules={{ required: 'RunTime is required' }}
            control={control}
            render={({ field }) => <input {...field} type="number" className={styles.input} />}
          />
        </div>
        <div>
          <label htmlFor="overview">Overview</label>
          <Controller
            name="overview"
            control={control}
            render={({ field }) => <textarea {...field} className={styles.input}/>}
          />
        </div>
        <div>
          <label htmlFor="release_date">Release Date</label>
          <Controller
            name="release_date"
            control={control}
            render={({ field }) => <input {...field} type="date" className={styles.input} />}
          />
        </div>
        <div>
          <label htmlFor="poster_path">Movie URL</label>
          <Controller
            name="poster_path"
            control={control}
            render={({ field }) => <input {...field} type="url" className={styles.input} />}
          />
        </div>
        <div>
          <label htmlFor="genres">Genres(comma, separated)</label>
          <Controller
            name="genres"
            control={control}
            render={({ field }) => <input {...field} type="text"  className={styles.input} />}
          />
        </div>
        <button type="submit" className={styles.submitButton} > Submit</button>
      </form>
    </div>
  );
}

export default MovieForm;
