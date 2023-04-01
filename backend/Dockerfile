FROM golang:alpine AS build
RUN apk update && apk add --no-cache git
WORKDIR /app
COPY ./api .
RUN go get ./...
RUN go build -o /out/my-application .


FROM alpine:latest
ENV GIN_MODE=release
ENV PORT=8080
WORKDIR /root/
COPY --from=build /app/out/my-application .
COPY --from=builder /app/.env . 
EXPOSE $PORT
CMD ["/out/my-application"]