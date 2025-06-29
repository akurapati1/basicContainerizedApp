# Use Node.js Image
FROM node:18

# Create App Directory
WORKDIR /App

#Copies all files that start with name "package" and end with ".json"
COPY package*.json ./

#Install packages mentioned in .json files
RUN npm install

#Copy all files in the Source folder(BasicContainerizedApp) into destination folder(Working direcory)
COPY . . 

#Run the App
CMD ["npm", "start"]