"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Component = () => {
  const searchparams = useSearchParams();
  const id = searchparams.get("id");
  const router = useRouter();

  const fetchid = async () => {
    try {
      const res = await axios.get(
        `https://work.grovyo.xyz/api/v1/fetchwithid/${id}`
      );
      console.log(res.data);
      if (res.data.success) {
        const data = res.data.user;
        sessionStorage.setItem("data", JSON.stringify(data));
        router.push("/");
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchid();
    }
  }, [id]);

  return (
    <>
      <div>

      </div>
    </>
  );
};

export default Component;
