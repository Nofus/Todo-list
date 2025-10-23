function generateID() {
  return `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export { generateID };