export function record_to(progress, textbox, loading) {
  if (progress && progress.style) {

    progress.style.display = 'none';
    loading.style.display = "none";

  } else {
    console.error('progress1 is not defined or not a valid DOM element');
  }
}

export function record_from(progress, textbox, loading) {
  if (progress && progress.style) {

    progress.style.display = 'none';
    loading.style.display = "none";
  } else {
    console.error('progress1 is not defined or not a valid DOM element');
  }
}
