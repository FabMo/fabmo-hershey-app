fabmo-hershey-app.fma: clean *.html js/* js/libs/*.js hershey/* icon.png package.json
	zip fabmo-hershey-app.fma *.html js/* js/libs/*.js hershey/* icon.png package.json

.PHONY: clean

clean:
	rm -rf fabmo-hershey-app.fma
