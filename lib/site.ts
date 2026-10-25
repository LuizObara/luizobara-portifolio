export const site = {
  email: "luizobara@gmail.com",
  resumePath: "/files/curriculo.pdf",
  resumeFileName: "CV-Luiz-Obara.pdf",
  social: {
    github: "https://github.com/LuizObara",
    linkedin: "https://www.linkedin.com/in/luizobara/",
    email: "mailto:luizobara@gmail.com",
    twitch: "https://www.twitch.tv/luizobara",
    instagram: "https://www.instagram.com/dixx.obara/",
  },
} as const;

export type SocialKey = keyof typeof site.social;

// Âncoras da home, na ordem em que aparecem
export const sectionIds = {
  about: "sobre",
  experience: "experiencia",
  stack: "stack",
  projects: "projetos",
  community: "comunidade",
  contact: "contato",
} as const;

export type SectionKey = keyof typeof sectionIds;
