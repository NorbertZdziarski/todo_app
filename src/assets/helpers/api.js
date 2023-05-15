export async function getAllTasks() {
    const response = await fetch('http://localhost:3000/tasks')
    return response.json()
}

export async function deleteTaskAPI(id) {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, {method: 'DELETE'})
    return response.json();
}