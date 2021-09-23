import { Router } from "express";
import onboard from "../v1/user/onboard.rou";
import student from "../v1/user/student_register.rou";
import teacher from "../v1/teacher/register_teacher.rou";
import clases from "../v1/teacher/class.rou"


export default function (router: Router) {

  router.use("/user", onboard(Router()));
  router.use("/user", student(Router()));
  router.use("/teacher", teacher(Router()));
  router.use("/teacher", clases(Router()));


  return router;
} 
