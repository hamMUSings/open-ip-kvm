FROM debian:bookworm-slim
WORKDIR /oiku
RUN apt update
RUN apt install -y ustreamer nodejs npm git
RUN git clone dev https://github.com/hamMUSings/open-ip-kvm.git
WORKDIR /oiku/open-ip-kvm/
RUN npm install
CMD ["npm","start","run"]