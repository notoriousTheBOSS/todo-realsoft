import { useState, useEffect } from "react";

function App() {
    const [inpValue, setInpValue] = useState("");
    const [bugun, setBugun] = useState([]);
    const [ertaga, setErtaga] = useState([]);
    const [keyin, setKeyin] = useState([]);
    const [currentDATE, setCurrentDATE] = useState(new Date());
    const hourRegex = /[0-9][0-9]:[0-9][0-9]/;
    const dateRegex = /\d{1,2}\.\d{1,2}\.\d{2,4}/;
    const lowercasedInput = inpValue.toLowerCase();
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDATE(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const addTask = (e) => {
        getTask();
        if (inpValue.trim().length > 0) {
            const newTask = {
                id: Date.now(),
                title: inpValue,
                isCompleted: false,
            };

            if (lowercasedInput.includes("ertaga")) {
                setErtaga([...ertaga, newTask]);
            } else if (
                (!lowercasedInput.includes("ertaga") &&
                    !lowercasedInput.includes("bugun")) ||
                dateRegex.test(lowercasedInput)
            ) {
                setKeyin([...keyin, newTask]);
            } else if (lowercasedInput.includes("bugun")) {
                setBugun([...bugun, newTask]);
            }
            setInpValue("");
        } else {
            alert("Maydonni to'ldiring!");
        }
    };

    const getTask = () => {
        const storedBugun = localStorage.getItem("bugun");
        const storedErtaga = localStorage.getItem("ertaga");
        const storedKeyin = localStorage.getItem("keyin");

        if (storedBugun) {
            setBugun(JSON.parse(storedBugun));
        }

        if (storedErtaga) {
            setErtaga(JSON.parse(storedErtaga));
        }

        if (storedKeyin) {
            setKeyin(JSON.parse(storedKeyin));
        }
    };

    useEffect(() => {
        getTask();
    }, []);

    const completeTodo = (todo) => {
        if (todo.title.includes("ertaga")) {
            getTask();
            const newArr = ertaga.map((v) =>
                v.id === todo.id ? { ...v, isCompleted: !todo.isCompleted } : v
            );
            setErtaga(newArr);
        } else if (
            (!todo.title.includes("ertaga") && !todo.title.includes("bugun")) ||
            dateRegex.test(todo.title)
        ) {
            getTask();
            const newArr = keyin.map((v) =>
                v.id === todo.id ? { ...v, isCompleted: !todo.isCompleted } : v
            );
            setKeyin(newArr);
        } else if (todo.title.includes("bugun")) {
            getTask();

            const newArr = bugun.map((v) =>
                v.id === todo.id ? { ...v, isCompleted: !todo.isCompleted } : v
            );
            setBugun(newArr);
        }
    };

    useEffect(() => {
        localStorage.setItem("bugun", JSON.stringify(bugun));
        localStorage.setItem("ertaga", JSON.stringify(ertaga));
        localStorage.setItem("keyin", JSON.stringify(keyin));
        console.log("15:00 fa adasda".match(hourRegex)[0]);
    }, [bugun, ertaga, keyin]);

    return (
        <>
            <div>
                <div className="container">
                    <div className="w-full py-10 border rounded-md px-5 min-h-screen h-auto flex flex-col justify-between">
                        <div>
                            <h1 className="text-center mt-[20px] text-[38px] font-bold">
                                Vazifalar Menedjeri
                            </h1>
                            <div>
                                <div className="flex items-center justify-between max-w-full gap-[25px] w-full mt-[100px]">
                                    <input
                                        type="text"
                                        value={inpValue}
                                        onChange={(e) =>
                                            setInpValue(e.target.value)
                                        }
                                        placeholder="Yangi vazifa qo'shish"
                                        className="outline-none  border-[3px] border-gray-300 max-w-[540px] w-full h-[50px] p-4 rounded-md"
                                    />
                                    <button
                                        onClick={() => addTask()}
                                        className="bg-green-300 border-[3px] rounded-md border-green-400 w-[50px] h-[50px] grid place-content-center"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            className="bi bi-plus"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                        </svg>
                                    </button>
                                </div>
                                <span className="text-gray-500 text-[17px] mt-[10px]">
                                    Bugun:{currentDATE.toLocaleString()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-[30px] font-bold mt-[40px] mb-[7px]">
                                    Bugun
                                </h2>
                                {bugun.length ? (
                                    <ul className="px-[10px] flex flex-col gap-y-[15px]">
                                        {bugun
                                            .sort(
                                                (a, b) =>
                                                    a.isCompleted -
                                                    b.isCompleted
                                            )
                                           
                                            .map((todo) => {
                                                return (
                                                    <li
                                                        key={todo?.id}
                                                        className="max-w-full w-full flex items-center justify-between"
                                                    >
                                                        <span className="flex gap-x-[20px]">
                                                            <span
                                                                onClick={() =>
                                                                    completeTodo(
                                                                        todo
                                                                    )
                                                                }
                                                                className={`w-[25px]  h-[25px] rounded-md ${
                                                                    !todo.isCompleted
                                                                        ? "border-[3px] border-gray-300"
                                                                        : "bg-blue-400"
                                                                }`}
                                                            ></span>
                                                            <p
                                                                className={`font-medium text-[17px] ${
                                                                    todo.isCompleted
                                                                        ? "line-through text-gray-600"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {todo?.title.includes(
                                                                    "bugun"
                                                                )
                                                                    ? todo?.title
                                                                          .replace(
                                                                              todo.title.match(
                                                                                  hourRegex
                                                                              ),
                                                                              ""
                                                                          )
                                                                          .replace(
                                                                              "bugun",
                                                                              ""
                                                                          )
                                                                    : todo?.title}
                                                            </p>
                                                        </span>
                                                        <p
                                                            className={`font-medium text-[17px] ${
                                                                todo.isCompleted
                                                                    ? "line-through text-gray-600"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {todo.title.match(
                                                                hourRegex
                                                            )
                                                                ? todo.title.match(
                                                                      hourRegex
                                                                  )
                                                                : new Date().getHours() +
                                                                  1 +
                                                                  ":00"}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                ) : (
                                    <p className="font-medium text-[17px] text-gray-400">
                                        Hozircha ma'lumot yo'q...
                                    </p>
                                )}
                            </div>
                            <div>
                                <h2 className="text-[30px] font-bold mt-[40px] mb-[7px]">
                                    Ertaga
                                </h2>
                                {ertaga.length ? (
                                    <ul className="px-[10px] flex flex-col gap-y-[15px]">
                                        {ertaga
                                            .sort(
                                                (a, b) =>
                                                    a.isCompleted -
                                                    b.isCompleted
                                            )
                                            
                                            .map((todo) => {
                                                return (
                                                    <li
                                                        key={todo?.id}
                                                        className="max-w-full w-full flex items-center justify-between"
                                                    >
                                                        <span className="flex gap-x-[20px]">
                                                            <span
                                                                onClick={() =>
                                                                    completeTodo(
                                                                        todo
                                                                    )
                                                                }
                                                                className={`w-[25px]  h-[25px] rounded-md ${
                                                                    !todo.isCompleted
                                                                        ? "border-[3px] border-gray-300"
                                                                        : "bg-blue-400"
                                                                }`}
                                                            ></span>
                                                            <p
                                                                className={`font-medium text-[17px] ${
                                                                    todo.isCompleted
                                                                        ? "line-through text-gray-600"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {todo?.title.includes(
                                                                    "ertaga"
                                                                )
                                                                    ? todo?.title
                                                                          .replace(
                                                                              todo.title.match(
                                                                                  hourRegex
                                                                              ),
                                                                              ""
                                                                          )
                                                                          .replace(
                                                                              "ertaga",
                                                                              ""
                                                                          )
                                                                    : todo?.title}
                                                            </p>
                                                        </span>
                                                        <p
                                                            className={`font-medium text-[17px] ${
                                                                todo.isCompleted
                                                                    ? "line-through text-gray-600"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {todo.title.match(
                                                                hourRegex
                                                            )
                                                                ? todo.title.match(
                                                                      hourRegex
                                                                  )
                                                                : new Date().getHours() +
                                                                  1 +
                                                                  ":00"}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                ) : (
                                    <p className="font-medium text-[17px] text-gray-400">
                                        Hozircha ma'lumot yo'q...
                                    </p>
                                )}
                            </div>
                            <div>
                                <h2 className="text-[30px] font-bold mt-[40px] mb-[7px]">
                                    Keyin
                                </h2>
                                {keyin.length ? (
                                    <ul className="px-[10px] flex flex-col gap-y-[15px]">
                                        {keyin
                                            .sort(
                                                (a, b) =>
                                                    a.isCompleted -
                                                    b.isCompleted
                                            )
                                          
                                            .map((todo) => {
                                                return (
                                                    <li
                                                        key={todo.id}
                                                        className="max-w-full w-full flex items-center justify-between"
                                                    >
                                                        <span className="flex gap-x-[20px]">
                                                            <span
                                                                onClick={() =>
                                                                    completeTodo(
                                                                        todo.id
                                                                    )
                                                                }
                                                                className={`w-[25px]  h-[25px] rounded-md ${
                                                                    !todo.isCompleted
                                                                        ? "border-[3px] border-gray-300"
                                                                        : "bg-blue-400"
                                                                }`}
                                                            />
                                                            <p
                                                                className={`font-medium text-[17px] ${
                                                                    todo.isCompleted
                                                                        ? "line-through text-gray-600"
                                                                        : ""
                                                                }`}
                                                            >
                                                                {!todo?.title.match(
                                                                    dateRegex
                                                                ) &&
                                                                    todo?.title}
                                                            </p>
                                                        </span>
                                                        <p
                                                            className={`font-medium text-[17px] ${
                                                                todo.isCompleted
                                                                    ? "line-through text-gray-600"
                                                                    : ""
                                                            }`}
                                                        >
                                                            {todo.title.match(
                                                                dateRegex
                                                            )
                                                                ? todo.title.match(
                                                                      dateRegex
                                                                  )
                                                                : new Date().toLocaleDateString()}
                                                            ,
                                                            {todo.title.match(
                                                                hourRegex
                                                            )
                                                                ? todo.title.match(
                                                                      hourRegex
                                                                  )
                                                                : new Date().getHours() +
                                                                  1 +
                                                                  ":00"}
                                                        </p>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                ) : (
                                    <p className="font-medium text-[17px] text-gray-400">
                                        Hozircha ma'lumot yo'q...
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-[70px] text-[13px] text-gray-400">
                            <span></span>
                            <span className="flex items-end flex-col">
                                <p>
                                    Bajarilganlar:{" "}
                                    {
                                        [...bugun, ...ertaga, ...keyin].filter(
                                            (v) => v.isCompleted === true
                                        ).length
                                    }
                                </p>
                                <p>
                                    Bajarilmaganlar:{" "}
                                    {
                                        [...bugun, ...ertaga, ...keyin].filter(
                                            (v) => v.isCompleted !== true
                                        ).length
                                    }
                                </p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
