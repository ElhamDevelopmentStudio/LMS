export const IsTeacher = (userId?: string | null) => {
  return userId === userId;
  // return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
};
