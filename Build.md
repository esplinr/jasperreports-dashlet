# Building from Source #

Check out the project if you have not already done so

svn checkout http://jasperreports-dashlet.googlecode.com/svn/trunk/
Change into the new directory

An Ant build script is provided to build a JAR file containing the custom files, which can then be installed into the tomcat/shared/lib folder of your Alfresco installation.

An Ant build script is provided to build a WAR file containing the custom files, which can then be installed into the tomcat/webapps folder of your Alfresco installation.

To build the JAR file, run the following command from the base project directory.

ant clean dist-jar

To build the WAR file, run the following command from the base project directory.

ant clean war