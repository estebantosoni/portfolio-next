import {client} from "../../lib/sanity"
import Image from 'next/image'
import {getTranslations} from 'next-intl/server'
import { Data, Project } from "@/app/types/interfaces";

export async function generateMetadata() {
    const t = await getTranslations("proyects");
    return {
        title: t("header")
    }
}

async function getSupabaseData(){
    //Sanity.io syntax
    const query = `*[_type == "project"] {
                        "tech": tech[]{
                            "src": asset->url,
                        },
                        link,
                        _id,
                        "imageUrl": image.asset->url
                    }`;

    const data = await client.fetch(query);

    return data;
}

export default async function Projects(){
    
    const t = await getTranslations("proyects");

    const projectList: Project[] = []

    for (let index = 0; index < 2; index++) {
        const project: Project = {
            id: index + 1,
            title: t(`my-projects.${index + 1}.title`),
            overview: t(`my-projects.${index + 1}.overview`),
        };
    
        projectList.push(project);
    }
    
    const supaData : Data[] = await getSupabaseData();

    const data: Data[] = supaData.map((item) => ({
        ...item,
        myProjects: projectList,
    }));

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="space-y-2 pt-6 pb-8 md:space-y-5">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    {t("title")}
                </h1>
            </div>
            <div className="grid gap-y-8 pb-8 sm:gap-6 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-10 pt-8">
                {
                    data.map((project, i) => (
                        <article key={project._id} className="overflow-hidden dark:border-zinc-600 rounded-lg border border-gray-200 bg-white shadow-lg dark:bg-black dark:shadow-gray-700 shadow-teal-100">
                            <div className="h-56 w-full relative">
                                <Image fill sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw" src={project.imageUrl} alt="Project image" className="w-full h-full object-cover" priority/>
                            </div>
                            <div className="p-4 sm:p-6">
                                <div className="flex space-x-2 mb-3 gap-3">
                                    {project.tech.map((tech, index) => (
                                        <Image src={tech.src} alt="tech icon" key={index} width="27" height="27" className="w-auto h-auto" priority/>
                                    ))}
                                </div>
                                <a href={project.link} target="_blank">
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                        {project.myProjects[i].title}
                                    </h3>
                                </a>
                                <p className="line-clamp-3 mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                    {project.myProjects[i].overview}
                                </p>
                                <a href={project.link} target="_blank" className="group mt-4 inline-flex items-center gap-1 text-sm font-medium text-teal-500">
                                    {t("learn-more")}
                                    <span className="block transition-all group-hover:ms-0.5">
                                        &rarr;
                                    </span>
                                </a>
                            </div>
                        </article>
                    ))
                }
            </div>
        </div>
    )
}